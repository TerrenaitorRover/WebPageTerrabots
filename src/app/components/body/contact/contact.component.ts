import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  emailForm: FormGroup;
  isLoading = false;
  message = '';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    this.message = ''; // limpiar mensaje anterior

    const { to, subject, message } = this.emailForm.value;

    this.emailService.sendEmail(to, subject, message).subscribe({
      next: () => {
        this.message = 'Email sent successfully!';
        this.emailForm.reset();
      },
      error: () => {
        this.message = 'Failed to send email.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
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

  // --- Funciones ---
  copy(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copiado: ${text}`);
    }).catch(() => {
      alert('No se pudo copiar.');
    });
  }

  openQr(src: string): void {
    window.open(src, '_blank');
  }
}

