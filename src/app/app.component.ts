import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainContentComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '';

  ngOnInit() {
    // Ensure browser doesn't restore previous scroll position automatically
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const clearHashAndGoTop = () => {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      const original = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Extra nudge after paint to defeat late layout shifts
      setTimeout(() => window.scrollTo(0, 0), 50);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = original || 'smooth';
      }, 150);
    };

    // Run on initial load
    clearHashAndGoTop();

    // Ensure clean state when restoring from bfcache
    window.addEventListener('pageshow', (e) => {
      if ((e as PageTransitionEvent).persisted) {
        clearHashAndGoTop();
      }
    });

    // On hard reload navigation, make sure we start at top
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
  }
}
