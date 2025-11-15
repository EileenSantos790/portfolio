import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Translations } from '../services/translation.service';

interface Project {
  name: string;
  duration: string;
  aboutEN: string;
  aboutDE: string;
  processEN: string;
  processDE: string;
  experienceEN: string;
  experienceDE: string;
  image: string;
  technologies: string[];
  live: string;
  github: string;
}

/**
 * Projects component displaying a list of projects with localization support.
 */
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
      aboutEN: 'A task manager inspired by the Kanban method. Easily create, organize, and move tasks with drag and drop, and assign users and categories seamlessly.',
      aboutDE: 'Ein Aufgabenmanager, inspiriert von der Kanban-Methode. Aufgaben können einfach erstellt, organisiert und per Drag-and-Drop verschoben werden. Nutzer und Kategorien lassen sich nahtlos zuweisen.',
      processEN: 'We were a team of three, and I focused on everything related to creating contacts and linking them to tasks. We supported each other throughout the project, which made working together a lot of fun. We built the app using JavaScript, HTML, CSS, and Google Firebase.',
      processDE: 'Wir waren ein Team von drei Personen, und ich habe mich auf alles konzentriert, was mit der Erstellung von Kontakten und deren Verknüpfung mit Aufgaben zu tun hatte. Wir haben uns während des Projekts gegenseitig unterstützt, was die Zusammenarbeit sehr angenehm gemacht hat. Die App wurde mit JavaScript, HTML, CSS und Google Firebase entwickelt.',
      experienceEN: 'We kept our project organized with a Trello Kanban board, splitting tasks and tracking To-Dos as a team. To keep the code clean and maintainable, we built reusable components, used clear naming everywhere, and made sure everything was well-documented.',
      experienceDE: 'Wir haben unser Projekt mit einem Trello-Kanban-Board organisiert, Aufgaben aufgeteilt und To-Dos als Team verfolgt. Um den Code sauber und wartbar zu halten, haben wir wiederverwendbare Komponenten gebaut, überall klare Bezeichnungen verwendet und alles gut dokumentiert.',
      image: '/assets/projects-section/join.png',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      live: 'https://join.eileen-santos.com/',
      github: 'https://github.com/EileenSantos790/join.1326'
    },
    {
      name: 'El Pollo Loco',
      duration: '3 weeks',
      aboutEN: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      aboutDE: 'Jump-and-Run-Spiel mit objektorientiertem Ansatz. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen das verrückte Huhn zu kämpfen.',
      processEN: 'I developed this game completely on my own, focusing on clean, modular JavaScript code. I broke the project down into reusable classes and documented everything thoroughly to keep it maintainable.',
      processDE: 'Ich habe dieses Spiel komplett eigenständig entwickelt und dabei Wert auf sauberen, modularen JavaScript-Code gelegt. Das Projekt wurde in wiederverwendbare Klassen unterteilt und umfassend dokumentiert, um die Wartbarkeit zu gewährleisten.',
      experienceEN: 'Solo project where I handled everything from game logic to UI. Built entirely with JavaScript, HTML5 Canvas, and CSS.',
      experienceDE: 'Ein Einzelprojekt, bei dem ich alles von der Spiellogik bis zur Benutzeroberfläche übernommen habe. Komplett mit JavaScript, HTML5 Canvas und CSS umgesetzt.',
      image: '/assets/projects-section/Pollo_Loco.png',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      live: 'https://el-pollo-loco.eileen-santos.com/',
      github: 'https://github.com/EileenSantos790/Pollo-Loco'
    }
  ];

  activeIndex = 0;
  currentLang: string;

  /**  
   * Initializes the projects component and subscribes to language changes.
   */
  constructor(private translationService: TranslationService) {
    this.translations = this.translationService.getTranslations();
    this.currentLang = this.translationService.getCurrentLanguageValue();
    this.translationService.getCurrentLanguage().subscribe((lang) => {
      this.translations = this.translationService.getTranslations();
      this.currentLang = lang;
    });
  }

  /**
   * Gets the localized text for a project field.
   * @param project The project object.
   * @param field The field name.
   * @returns Localized text.
   */
  getProjectText(project: Project, field: 'about' | 'process' | 'experience'): string {
    if (this.currentLang === 'DE') {
      return project[`${field}DE`];
    }
    return project[`${field}EN`];
  }

  /**
   * Sets the active project index.
   * @param index The project index to set as active.
   */
  setActive(index: number) {
    this.activeIndex = index;
  }
}
