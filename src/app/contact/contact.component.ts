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
import { TranslationService, Translations } from '../services/translation.service';

/**
 * Validator that fails when the value is only whitespace.
 * Returns a required error to integrate with current UI checks.
 */
export function notBlankValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined) return null;
  return String(value).trim().length > 0 ? null : { required: true };
}

/**
 * Custom email validator to ensure TLD is present.
 * @param control The form control to validate.
 * @returns Validation error object or null if valid.
 */
export function emailWithTLDValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const emailRegex = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) ? null : { email: true };
}

/**
 * Custom name validator to ensure no numbers are present.
 * @param control The form control to validate.
 * @returns Validation error object or null if valid.
 */
export function nameWithoutNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasNumbers = /\d/.test(value);
  return hasNumbers ? { invalidName: true } : null;
}

/**
 * Contact component for handling user contact form.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  http = inject(HttpClient);
  translations: Translations;

  contactForm: FormGroup;
  submitted = false;
  isCheckboxHovered = false;
  arrowIsHovered = false;
  arrowMobileIsHovered = false;
  mailIsHovered = false;
  phoneIsHovered = false;
  showToast = false;

  /**
   * Initializes the contact form and subscribes to language changes.
   */
  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService
  ) {
    this.translations = this.translationService.getTranslations();
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.translations = this.translationService.getTranslations();
    });
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, notBlankValidator, nameWithoutNumbersValidator]],
      email: ['', [Validators.required, notBlankValidator, emailWithTLDValidator]],
      message: ['', [Validators.required, notBlankValidator]],
      privacyPolicy: [false, Validators.requiredTrue]
    });
  }

  post = {
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
   * Handles form submission and sends data if valid.
   */
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.sendFormData();
    }
  }

  /**
   * Sends form data to the backend and handles response.
   */
  private sendFormData() {
    const formData = this.contactForm.value;
    this.http.post(
      this.post.endPoint,
      this.post.body(formData),
      this.post.options
    ).subscribe({
      next: (response: any) => {
        this.displayToast();
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (err) => { console.error('Mail send failed:', err); alert('Mail send failed. try again!'); }
    });
  }


  /**
   * Checks if the privacy policy checkbox is invalid and touched or submitted.
   * @returns True if privacy policy has error.
   */
  hasPrivacyError(): boolean {
    const control = this.contactForm.get('privacyPolicy');
    return !!(control?.invalid && (control.touched || this.submitted));
  }

  /**
   * Returns the checkbox image path based on state.
   * @returns Path to the checkbox image.
   */
  getCheckboxImage(): string {
    const isChecked = this.contactForm.get('privacyPolicy')?.value;
    const hasError = this.hasPrivacyError();
    if (isChecked) return '/assets/contact-section/Check_Box_3.svg';
    if (hasError) return '/assets/contact-section/Check_Box_4.svg';
    if (this.isCheckboxHovered) return '/assets/contact-section/Check_Box_2.svg';
    return '/assets/contact-section/Check_Box_1.svg';
  }

  /**
   * Returns a dynamic placeholder or error message for a form field.
   * @param field The form control name.
   * @returns Localized placeholder or error text.
   */
  getDynamicPlaceholder(field: string): string {
    const control = this.contactForm.get(field);
    if (!control) return '';
    if (this.shouldShowError(control)) {
      return this.getErrorText(field, control);
    }
    return this.getPlaceholderText(field);
  }

  /**
   * Checks if the control should show an error.
   * @param control The form control.
   * @returns True if error should be shown.
   */
  private shouldShowError(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.submitted);
  }

  /**
   * Gets the error text for a field.
   * @param field The form control name.
   * @param control The form control.
   * @returns Error text.
   */
  private getErrorText(field: string, control: AbstractControl): string {
    if (field === 'email') {
      return this.translations.contact.emailRequired;
    }
    if (field === 'name') {
      if (control.hasError('invalidName')) {
        return 'Name cannot contain numbers';
      }
      return this.translations.contact.nameRequired;
    }
    if (field === 'message') {
      return this.translations.contact.messageRequired;
    }
    return '';
  }

  /**
   * Gets the placeholder text for a field.
   * @param field The form control name.
   * @returns Placeholder text.
   */
  private getPlaceholderText(field: string): string {
    if (field === 'email') {
      return this.translations.contact.emailPlaceholder;
    }
    if (field === 'name') {
      return this.translations.contact.namePlaceholder;
    }
    if (field === 'message') {
      return this.translations.contact.messagePlaceholder;
    }
    return '';
  }

  /**
   * Shows a toast notification for a short period.
   */
  displayToast() {
    this.showToast = false;
    setTimeout(() => this.showToast = true, 10);
    setTimeout(() => this.showToast = false, 3000);
  }

  /**
   * Handles email link click and preserves scroll position.
   * @param event The click event.
   */
  onEmailClick(event: Event) {
    const scrollPosition = window.pageYOffset;
    window.location.href = 'mailto:eileen.santos@outlook.de';
    setTimeout(() => window.scrollTo(0, scrollPosition), 0);
    setTimeout(() => window.scrollTo(0, scrollPosition), 100);
  }
}
