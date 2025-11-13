import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language, Translations } from '../services/translation.service';

/**
 * Hero component for the landing section of the portfolio.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  isMenuOpen = false;
  translations: Translations;
  activeLanguage: Language = 'EN';

  /**  
   * Initializes the hero component and subscribes to language changes.
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

  /**
   * Scrolls to a section smoothly.
   * @param sectionId Section ID to scroll to.
   * @param event Click event.
   */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
