export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { email, subject, message, website, startedAt, turnstileToken } = body;

  // Honeypot — bots auto-fill this hidden field
  if (website) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  // Required fields
  if (!email || !subject || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  // Basic email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid email" }) };
  }

  // Timing check — reject if form filled in under 3 seconds
  if (startedAt) {
    const elapsed = Date.now() - Number(startedAt);
    if (elapsed < 3000) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
  }

  // Turnstile token validation
  if (!turnstileToken) {
    return { statusCode: 400, body: JSON.stringify({ error: "Verification required" }) };
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return { statusCode: 403, body: JSON.stringify({ error: "Verification failed" }) };
      }
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: "Verification service error" }) };
    }
  }

  // Forward to Google Apps Script
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error" }) };
  }

  try {
    const scriptRes = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email, subject, message }),
      redirect: "follow",
    });
    const scriptText = await scriptRes.text();

    let scriptData;
    try {
      scriptData = JSON.parse(scriptText);
    } catch {
      return { statusCode: 502, body: JSON.stringify({ error: "Invalid response from email service" }) };
    }

    if (scriptData.success) {
      return { statusCode: 200, body: JSON.stringify({ success: true, message: scriptData.message }) };
    } else {
      return { statusCode: 502, body: JSON.stringify({ error: scriptData.error || "Email delivery failed" }) };
    }
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to reach email service" }) };
  }
}
