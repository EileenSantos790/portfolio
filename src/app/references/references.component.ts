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
      name: 'The journey begins',
      project: '2020 - 2022',
      reference: 'I completed my general university entrance qualification and want to learn more about programming and UX design.',
    },
    {
      name: 'My first steps',
      project: '2022 - 2024',
      reference: 'I began studying UX and UI design to expand my knowledge and grow professionally.',
    },
    {
      name: 'Following the objective',
      project: '2024 - Present',
      reference: 'I have a strong interest in deepening my knowledge in front-end development and am currently completing additional training at the Developer Academy alongside my studies.',
    }
  ];
}
