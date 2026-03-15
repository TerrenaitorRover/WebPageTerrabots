import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../email.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare var turnstile: any;

const TURNSTILE_SITE_KEY_PROD = '0x4AAAAAACq9Po-fcGtim7tk';
const TURNSTILE_SITE_KEY_TEST = '1x00000000000000000000AA';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('turnstileContainer') turnstileContainer!: ElementRef;

  emailForm: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';
  turnstileToken = '';
  startedAt = Date.now();
  private turnstileWidgetId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private translate: TranslateService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      website: [''],
    });
  }

  ngAfterViewInit() {
    this.renderTurnstile();
  }

  ngOnDestroy() {
    if (this.turnstileWidgetId !== null && typeof turnstile !== 'undefined') {
      turnstile.remove(this.turnstileWidgetId);
    }
  }

  private renderTurnstile() {
    const tryRender = () => {
      if (typeof turnstile !== 'undefined' && this.turnstileContainer?.nativeElement) {
        const siteKey = isDevMode() ? TURNSTILE_SITE_KEY_TEST : TURNSTILE_SITE_KEY_PROD;
        this.turnstileWidgetId = turnstile.render(this.turnstileContainer.nativeElement, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => { this.turnstileToken = token; },
          'expired-callback': () => { this.turnstileToken = ''; },
          'error-callback': (errorCode: string) => { console.error('Turnstile error:', errorCode); this.turnstileToken = ''; },
        });
      } else {
        setTimeout(tryRender, 500);
      }
    };
    tryRender();
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    if (!this.turnstileToken) {
      this.message = this.translate.instant('CONTACT.TURNSTILE_REQUIRED');
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.messageType = '';

    const { email, subject, message, website } = this.emailForm.value;

    this.emailService.sendEmail({
      email,
      subject,
      message,
      website: website || '',
      startedAt: this.startedAt,
      turnstileToken: this.turnstileToken,
    }).subscribe({
      next: () => {
        this.message = this.translate.instant('CONTACT.SUCCESS');
        this.messageType = 'success';
        this.emailForm.reset();
        this.isLoading = false;
        this.startedAt = Date.now();
        this.resetTurnstile();
      },
      error: () => {
        this.message = this.translate.instant('CONTACT.ERROR');
        this.messageType = 'error';
        this.isLoading = false;
        this.resetTurnstile();
      },
    });
  }

  private resetTurnstile() {
    this.turnstileToken = '';
    if (this.turnstileWidgetId !== null && typeof turnstile !== 'undefined') {
      turnstile.reset(this.turnstileWidgetId);
    }
  }

  // --- QR Yape & Plin ---
  yapeQr: string = 'assets/yape.png';
  plinQr: string = 'assets/plin.png';
  phone: string = '+51 944 057 646';

  // --- Cuentas Bancarias ---
  cuentas = [
    {
      banco: 'BCP (Soles)',
      cuenta: '26070161012050',
      cci: '00226017016101205085'
    },
    {
      banco: 'BCP (Dólares)',
      cuenta: '19102959172160',
      cci: '00219110295917216058'
    },
    {
      banco: 'Interbank (Soles)',
      cuenta: '898 3330848571',
      cci: '00389801333084857142'
    }
  ];

  // --- Toast notification ---
  copyMessage: string = '';

  copy(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copyMessage = `${this.translate.instant('CONTACT.COPIED')}: ${text}`;
      setTimeout(() => this.copyMessage = '', 2500);
    }).catch(() => {
      this.copyMessage = this.translate.instant('CONTACT.COPY_FAILED');
      setTimeout(() => this.copyMessage = '', 2500);
    });
  }

  openQr(src: string): void {
    window.open(src, '_blank');
  }
}
