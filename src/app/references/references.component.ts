import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Reference {
  name: string;
  project: string;
  reference: string;
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
      name: 'Person 1',
      project: 'Join',
      reference: 'Kommentar TO DO',
      link: 'https://www.linkedin.com'
    },
    {
      name: 'Person 2',
      project: 'Join',
      reference: "Kommentar TO DO",
      link: 'https://www.linkedin.com'
    },
    {
      name: 'Person 3',
      project: 'El-Pollo-Loco',
      reference: "Kommentar TO DO",
      link: 'https://www.linkedin.com'
    }
  ];
}
