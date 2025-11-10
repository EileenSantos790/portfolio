import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', icon: '../../assets/skills-section/Angular.svg' },
    { name: 'TypeScript', icon: '../../assets/skills-section/TypeScript.svg' },
    { name: 'JavaScript', icon: '../../assets/skills-section/JavaScript.svg' },
    { name: 'HTML', icon: '../../assets/skills-section/HTML.svg' },
    { name: 'CSS', icon: '../../assets/skills-section/CSS.svg' },
    { name: 'Rest-Api', icon: '../../assets/skills-section/Rest-Api.svg' },
    { name: 'Firebase', icon: '../../assets/skills-section/Firebase.svg' },
    { name: 'GIT', icon: '../../assets/skills-section/GIT.svg' },
    { name: 'Scrum', icon: '../../assets/skills-section/Scrum.svg' },
    { name: 'Material Design', icon: '../../assets/skills-section/Material Design.svg' }
  ];

  learningSkills = [
    { name: 'Angular', icon: '../../assets/skills-section/Angular.svg' }
  ];
}
