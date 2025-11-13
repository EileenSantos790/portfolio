import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TranslationService, Language, Translations } from '../services/translation.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  isMenuOpen = false;
  translations: Translations;
  activeLanguage: Language = 'EN';

  constructor(private translationService: TranslationService) {
    this.activeLanguage = this.translationService.getCurrentLanguageValue();
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.activeLanguage = lang;
      this.translations = this.translationService.getTranslations();
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  setActiveLanguage(language: Language): void {
    this.translationService.setLanguage(language);
    this.closeMenu();
  }
}
