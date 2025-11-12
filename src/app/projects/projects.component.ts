import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Translations } from '../services/translation.service';

interface Project {
  name: string;
  duration: string;
  about: string;
  process: string;
  experience: string;
  image: string;
  technologies: string[];
  live: string;
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  translations: Translations;
  projects: Project[] = [
    {
      name: 'Join',
      duration: '7 weeks',
      about: 'A task manager inspired by the Kanban method. Easily create, organize, and move tasks with drag and drop, and assign users and categories seamlessly.',
      process: 'We were a team of three, and I focused on everything related to creating contacts and linking them to tasks. We supported each other throughout the project, which made working together a lot of fun. We built the app using JavaScript, HTML, CSS, and Google Firebase.',
      experience: 'We kept our project organized with a Trello Kanban board, splitting tasks and tracking To-Dos as a team. To keep the code clean and maintainable, we built reusable components, used clear naming everywhere, and made sure everything was well-documented.',
      image: '/assets/projects-section/join.png',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      live: 'https://eileen-vieira-dos-santos.developerakademie.net/Join',
      github: 'https://github.com/EileenSantos790/join.1326'
    },
    {
      name: 'El Pollo Loco',
      duration: '3 weeks',
      about: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      process: 'I developed this game completely on my own, focusing on clean, modular JavaScript code. I broke the project down into reusable classes and documented everything thoroughly to keep it maintainable.',
      experience: 'Solo project where I handled everything from game logic to UI. Built entirely with JavaScript, HTML5 Canvas, and CSS.',
      image: '/assets/projects-section/Pollo_Loco.png',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      live: 'https://eileen-vieira-dos-santos.developerakademie.net/Pollo_Loco',
      github: 'https://github.com/EileenSantos790/Pollo-Loco'
    }
  ];

  activeIndex = 0;

  constructor(private translationService: TranslationService) {
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.translations = this.translationService.getTranslations();
    });
  }

  setActive(index: number) {
    this.activeIndex = index;
  }
}
