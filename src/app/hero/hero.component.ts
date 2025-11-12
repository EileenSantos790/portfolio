import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language, Translations } from '../services/translation.service';

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
