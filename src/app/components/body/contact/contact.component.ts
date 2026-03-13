import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../email.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  emailForm: FormGroup;
  isLoading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private translate: TranslateService
  ) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    this.message = '';

    const { to, subject, message } = this.emailForm.value;

    this.emailService.sendEmail(to, subject, message).subscribe({
      next: () => {
        this.message = this.translate.instant('CONTACT.SUCCESS');
        this.emailForm.reset();
      },
      error: () => {
        this.message = this.translate.instant('CONTACT.ERROR');
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

  // --- Toast notification ---
  copyMessage: string = '';

  // --- Funciones ---
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
