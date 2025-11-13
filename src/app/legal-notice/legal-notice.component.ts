import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TranslationService, Language, Translations } from '../services/translation.service';

/**
 * Legal Notice component displaying legal information.
 */
@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  isMenuOpen = false;
  translations: Translations;
  activeLanguage: Language = 'EN';

  /**  
   * Initializes the legal notice component and subscribes to language changes.
   */
  constructor(private translationService: TranslationService) {
    this.activeLanguage = this.translationService.getCurrentLanguageValue();
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.activeLanguage = lang;
      this.translations = this.translationService.getTranslations();
    });
  }

  /**  
   * Lifecycle hook called on component initialization.
   */
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /**
   * Toggles the mobile menu open/close state.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Closes the mobile menu.
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Sets the active language and closes the menu.
   * @param language Language to set.
   */
  setActiveLanguage(language: Language): void {
    this.translationService.setLanguage(language);
    this.closeMenu();
  }
}
