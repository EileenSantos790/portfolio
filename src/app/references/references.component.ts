import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

interface Reference {
  nameEN: string;
  nameDE: string;
  project: string;
  referenceEN: string;
  referenceDE: string;
  link?: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  references: Reference[] = [
    {
      nameEN: 'The journey begins',
      nameDE: 'Der Weg beginnt',
      project: '2020 - 2022',
      referenceEN: 'I completed my general university entrance qualification and want to learn more about programming and UX design.',
      referenceDE: 'Ich habe mein allgemeines Abitur abgeschlossen und möchte mehr über Programmierung und UX-Design lernen.',
    },
    {
      nameEN: 'My first steps',
      nameDE: 'Meine ersten Schritte',
      project: '2022 - 2024',
      referenceEN: 'I began studying UX and UI design to expand my knowledge and grow professionally.',
      referenceDE: 'Ich habe begonnen, UX- und UI-Design zu studieren, um mein Wissen zu erweitern und mich beruflich weiterzuentwickeln.',
    },
    {
      nameEN: 'Following the objective',
      nameDE: 'Dem Ziel folgend',
      project: '2024 - Present',
      referenceEN: 'I have a strong interest in deepening my knowledge in front-end development and am currently completing additional training at the Developer Academy.',
      referenceDE: 'Ich möchte mein Wissen in der Frontend-Entwicklung vertiefen und absolviere derzeit eine Schulung an der Developer Akademie',
    }
  ];
  currentLang: string = 'EN';
  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLanguageValue();
    this.translationService.getCurrentLanguage().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  getReferenceText(ref: Reference, field: 'name' | 'reference'): string {
    if (this.currentLang === 'DE') {
      return ref[`${field}DE`];
    }
    return ref[`${field}EN`];
  }
}
