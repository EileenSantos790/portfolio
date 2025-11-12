import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/**
 * Custom email validator to ensure TLD is present.
 * @param control The form control to validate.
 * @returns Validation error object or null if valid.
 */
export function emailWithTLDValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(value) ? null : { email: true };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  http = inject(HttpClient);

  contactForm: FormGroup;
  submitted = false;
  isCheckboxHovered = false;
  arrowIsHovered = false;
  mailIsHovered = false;
  phoneIsHovered = false;
  showToast = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, emailWithTLDValidator]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  post = {
    // Use relative URL to always hit the same origin (avoids CORS across www/non-www)
    endPoint: '/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      responseType: 'json' as const,
    },
  };

  /**
   * Submits the contact form if valid.
   * Sends a POST request with form data to the backend.
   */
  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post(
        this.post.endPoint,
        this.post.body(formData),
        this.post.options
      ).subscribe({
        next: (response: any) => {
          //console.log('Mail sent successfully:', response);
          this.displayToast();
          this.contactForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Mail send failed:', err);
          alert('Mail send failed. try again!');
        }
      });
    }
  }

  /**
   * Checks if the privacy policy checkbox has an error.
   * @returns True if the checkbox is invalid and has been interacted with.
   */
  hasPrivacyError(): boolean {
    const control = this.contactForm.get('privacyPolicy');
    return !!(control?.invalid && (control.touched || this.submitted));
  }

  /**
   * Returns the correct checkbox image based on current state.
   * @returns Path to the image to display.
   */
  getCheckboxImage(): string {
    const isChecked = this.contactForm.get('privacyPolicy')?.value;
    const hasError = this.hasPrivacyError();

    if (isChecked) {
      return '/assets/contact-section/Check_Box_3.svg';
    } else if (hasError) {
      return '/assets/contact-section/Check_Box_4.svg';
    } else if (this.isCheckboxHovered) {
      return '/assets/contact-section/Check_Box_2.svg';
    } else {
      return '/assets/contact-section/Check_Box_1.svg';
    }
  }

  /**
   * Returns a dynamic placeholder or error message for a form field.
   * @param field The form control name (e.g., 'email', 'name', 'message').
   * @returns A localized placeholder or error text.
   */
  getDynamicPlaceholder(field: string): string {
    const control = this.contactForm.get(field);
    if (!control) return '';

    const hasError = control.invalid && (control.touched || this.submitted);

    if (hasError) {
      if (field === 'email') {
        return 'Email is required';
      }
      if (field === 'name') {
        return 'Your name is required';
      }
      if (field === 'message') {
        return 'Message is required';
      }
    }

    if (field === 'email') {
      return 'Your Email';
    }
    if (field === 'name') {
      return 'Your Name';
    }
    if (field === 'message') {
      return 'Your Message';
    }

    return '';
  }

  displayToast() {
    this.showToast = false;
    setTimeout(() => this.showToast = true, 10);
    setTimeout(() => this.showToast = false, 3000);
  }
}
