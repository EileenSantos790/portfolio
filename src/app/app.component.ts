import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';

declare const AOS: any;

/**
 * Root application component that sets up global behaviors and layout.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '';

  /**  
   * Initializes the app component and sets up scroll restoration and page show handling.
   */
  ngOnInit() {
    this.setupScrollRestoration();
    this.clearHashAndGoTop();
    this.setupPageShowListener();
    this.setupBeforeUnloadListener();
    this.initAOS();
  }

  /**
   * Initializes AOS (Animate On Scroll) library.
   */
  private initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
  }

  /**
   * Configures manual scroll restoration for the browser.
   */
  private setupScrollRestoration() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  /**
   * Clears URL hash and scrolls to top with auto behavior.
   */
  private clearHashAndGoTop() {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    this.scrollToTopWithoutAnimation();
  }

  /**
   * Scrolls to top without smooth animation.
   */
  private scrollToTopWithoutAnimation() {
    const original = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setTimeout(() => window.scrollTo(0, 0), 50);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = original || 'smooth';
    }, 150);
  }

  /**
   * Sets up listener for pageshow event to handle bfcache.
   */
  private setupPageShowListener() {
    window.addEventListener('pageshow', (e) => {
      if ((e as PageTransitionEvent).persisted) {
        this.clearHashAndGoTop();
      }
    });
  }

  /**
   * Sets up listener for beforeunload to scroll to top.
   */
  private setupBeforeUnloadListener() {
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
  }
}
