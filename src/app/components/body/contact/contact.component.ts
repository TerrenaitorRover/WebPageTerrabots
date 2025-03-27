import { Component } from '@angular/core';
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
}

