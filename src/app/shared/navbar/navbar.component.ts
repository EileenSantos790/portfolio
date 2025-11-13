import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService, Language, Translations } from '../../services/translation.service';

/*
* Navbar component for site navigation and language selection. 
*/
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

  /**
   * Initializes the navbar component and subscribes to language changes.
   */
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

  /**
   * Updates active section based on scroll position.
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isScrolling) return;
    const sections = ['about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.pageYOffset + 150;
    this.updateActiveSectionOnScroll(sections, scrollPosition);
  }

  /**
   * Determines and sets the active section based on scroll position.
   * @param sections Array of section IDs.
   * @param scrollPosition Current scroll position.
   */
  private updateActiveSectionOnScroll(sections: string[], scrollPosition: number) {
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && this.isSectionActive(element, scrollPosition)) {
        this.activeSection = section;
        break;
      }
    }
  }

  /**
   * Checks if a section is currently active based on scroll position.
   * @param element The section element.
   * @param scrollPosition Current scroll position.
   * @returns True if section is active.
   */
  private isSectionActive(element: HTMLElement, scrollPosition: number): boolean {
    const offsetTop = element.offsetTop;
    const offsetHeight = element.offsetHeight;
    return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
  }

  /**
   * Sets active section and scrolls to it smoothly.
   * @param section Section ID to navigate to.
   * @param event Click event.
   */
  setActiveSection(section: string, event: Event) {
    event.preventDefault();
    const basePath = this.router.url.split('#')[0];
    if (this.shouldNavigateToHome(basePath)) {
      this.navigateToHomeAndScroll(section);
      return;
    }
    this.scrollToSection(section);
  }

  /**
   * Checks if navigation to home is needed.
   * @param basePath Current base path.
   * @returns True if should navigate to home.
   */
  private shouldNavigateToHome(basePath: string): boolean {
    return !!(basePath && basePath !== '/' && basePath !== '');
  }

  /**
   * Navigates to home and scrolls to section.
   * @param section Section ID to scroll to.
   */
  private navigateToHomeAndScroll(section: string) {
    this.router.navigate([''], { fragment: section }).then(() => {
      this.isScrolling = true;
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => (this.isScrolling = false), 800);
    });
  }

  /**
   * Scrolls to a section smoothly.
   * @param section Section ID to scroll to.
   */
  private scrollToSection(section: string) {
    this.activeSection = section;
    this.isScrolling = true;
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => (this.isScrolling = false), 800);
    }
  }

  /**
   * Sets the active language for the application.
   * @param language Language to set.
   * @param event Click event.
   */
  setActiveLanguage(language: Language, event: Event) {
    event.preventDefault();
    this.translationService.setLanguage(language);
  }
}
