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
      name: 'Tess Puschmann',
      project: 'Join',
      reference: 'A reliable team member who stays focused during busy project phases. Handles deadlines well and keeps an overview even when things get hectic. Brings structure and calmness to the team.',
    },
    {
      name: 'Annabella Lopez',
      project: 'Join',
      reference: 'Shows good organizational skills and keeps projects on track. Works thoughtfully on design tasks and communicates clearly about progress and priorities.',
    },
    {
      name: 'Sara Pohl',
      project: 'El-Pollo-Loco',
      reference: 'Loved the creativity and fun in the game design. The mechanics were smooth and engaging, making it a joy to play through the levels.',
    }
  ];
}
