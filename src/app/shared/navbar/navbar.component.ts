import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService, Language, Translations } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeSection: string = '';
  activeLanguage: Language = 'EN';
  private isScrolling: boolean = false;
  translations: Translations;

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {
    this.activeLanguage = this.translationService.getCurrentLanguageValue();
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.activeLanguage = lang;
      this.translations = this.translationService.getTranslations();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isScrolling) return;

    const sections = ['about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.pageYOffset + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  setActiveSection(section: string, event: Event) {
    event.preventDefault();
    const basePath = this.router.url.split('#')[0];

    if (basePath && basePath !== '/' && basePath !== '') {
      this.router.navigate([''], { fragment: section }).then(() => {
        this.isScrolling = true;
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => (this.isScrolling = false), 800);
      });
      return;
    }

    this.activeSection = section;
    this.isScrolling = true;

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Clear scrolling state after the animation likely finished
      setTimeout(() => {
        this.isScrolling = false;
      }, 800);
    }
  }

  setActiveLanguage(language: Language, event: Event) {
    event.preventDefault();
    this.translationService.setLanguage(language);
  }
}
