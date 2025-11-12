import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService, Translations } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  githubHovered: boolean = false;
  mailHovered: boolean = false;
  linkedinHovered: boolean = false;
  translations: Translations;

  constructor(private translationService: TranslationService) {
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.translations = this.translationService.getTranslations();
    });
  }
}
