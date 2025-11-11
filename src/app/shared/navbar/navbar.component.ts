import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeSection: string = '';
  activeLanguage: string = 'EN';
  private isScrolling: boolean = false;

  constructor(private router: Router) {}

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
      this.router.navigate([''], { fragment: section });
      return;
    }

    this.activeSection = section;
    this.isScrolling = true;

    const element = document.getElementById(section);
    if (element) {
      document.documentElement.style.scrollBehavior = 'auto';
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        this.isScrolling = false;
      }, 100);
    }
  }

  setActiveLanguage(language: string, event: Event) {
    event.preventDefault();
    this.activeLanguage = language;
  }
}
