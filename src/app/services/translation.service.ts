import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'EN' | 'DE';

export interface Translations {
  navbar: {
    whyMe: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    developer: string;
    frontendDeveloper: string;
  };
  about: {
    title: string;
    iAm: string;
    description: string;
    letsTalk: string;
  };
  skills: {
    title: string;
    currentlyLearning: string;
    motivationalText: string;
    letsTalk: string;
  };
  projects: {
    title: string;
    aboutProject: string;
    duration: string;
    howOrganized: string;
    groupExperience: string;
    technologies: string;
    liveTest: string;
    github: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    tel: string;
    yourName: string;
    yourEmail: string;
    yourMessage: string;
    nameRequired: string;
    emailRequired: string;
    invalidEmail: string;
    messageRequired: string;
    privacyPolicy: string;
    privacyPolicyText: string;
    privacyPolicyRequired: string;
    sendMessage: string;
    messageSent: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  footer: {
    legalNotice: string;
    copyright: string;
    developer: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage$ = new BehaviorSubject<Language>('EN');
  
  private translations: Record<Language, Translations> = {
    EN: {
      navbar: {
        whyMe: 'Why me',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        developer: 'developer',
        frontendDeveloper: 'FRONTEND DEVELOPER'
      },
      about: {
        title: 'Why me',
        iAm: 'I am',
        description: "I'm passionate about coding because it allows me to turn ideas into real, working solutions. I enjoy the analytical process of breaking down complex problems and finding creative, efficient ways to solve them. Coding constantly challenges me to learn, improve, and think differently. I also value the collaborative side of development — sharing ideas, building with others, and seeing how teamwork can create something greater than the sum of its parts.",
        letsTalk: "Let's talk"
      },
      skills: {
        title: 'My skills',
        currentlyLearning: 'I am currently learning',
        motivationalText: "Didn't find the skill you're looking for? I'm always motivated to learn new areas and expand my expertise.",
        letsTalk: "Let's talk"
      },
      projects: {
        title: 'My Projects',
        aboutProject: 'About the project',
        duration: 'Duration',
        howOrganized: 'How I have organised my work process',
        groupExperience: 'My group work experience',
        technologies: 'Technologies',
        liveTest: 'Live Test',
        github: 'GitHub'
      },
      contact: {
        title: 'Contact me',
        description: 'Feel free to get in touch with opportunities such as Frontend Developer or Web Developer roles. I’m passionate about building clean, responsive, and user-focused web experiences that make an impact. Let’s connect and create something great!',
        email: 'E-mail',
        phone: 'Phone',
        tel: 'Tel',
        yourName: 'Your name',
        yourEmail: 'Your Email',
        yourMessage: 'Your Message',
        nameRequired: 'Your Name is required.',
        emailRequired: 'Email is required.',
        invalidEmail: 'Invalid email format.',
        messageRequired: 'Message is required.',
        privacyPolicy: 'Privacy policy',
        privacyPolicyText: "I've read the <a href='/legal-notice' target='_blank'>privacy policy</a> and agree to the processing of my data as outlined.",
        privacyPolicyRequired: 'Please accept the privacy policy.',
        sendMessage: 'Send',
        messageSent: 'Message sent successfully!',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'Your email',
        messagePlaceholder: 'Your message'
      },
      footer: {
        legalNotice: 'Legal notice',
        copyright: '© Eileen Santos 2025',
        developer: 'Developer'
      }
    },
    DE: {
      navbar: {
        whyMe: 'Warum ich',
        skills: 'Fähigkeiten',
        projects: 'Projekte',
        contact: 'Kontakt'
      },
      hero: {
        developer: 'Entwicklerin',
        frontendDeveloper: 'FRONTEND ENTWICKLERIN'
      },
      about: {
        title: 'Warum ich',
        iAm: 'Ich bin',
        description: 'Ich bin leidenschaftlich am Programmieren, weil es mir ermöglicht, Ideen in echte, funktionierende Lösungen zu verwandeln. Ich genieße den analytischen Prozess, komplexe Probleme zu zerlegen und kreative, effiziente Wege zu finden, sie zu lösen. Das Programmieren fordert mich ständig heraus zu lernen, mich zu verbessern und anders zu denken. Ich schätze auch die kollaborative Seite der Entwicklung – Ideen teilen, mit anderen bauen und sehen, wie Teamarbeit etwas Größeres schaffen kann als die Summe seiner Teile.',
        letsTalk: 'Lass uns reden'
      },
      skills: {
        title: 'Meine Fähigkeiten',
        currentlyLearning: 'Ich lerne derzeit',
        motivationalText: 'Haben Sie die gesuchte Fähigkeit nicht gefunden? Ich bin immer motiviert, neue Bereiche zu lernen und mein Fachwissen zu erweitern. Zögern Sie also nicht, mich zu kontaktieren – ich freue mich darauf, neue Fähigkeiten zu entwickeln und neue Herausforderungen anzunehmen!',
        letsTalk: 'Lass uns reden'
      },
      projects: {
        title: 'Meine Projekte',
        aboutProject: 'Über das Projekt',
        duration: 'Dauer',
        howOrganized: 'Wie ich meinen Arbeitsprozess organisiert habe',
        groupExperience: 'Meine Gruppenarbeitserfahrung',
        technologies: 'Technologien',
        liveTest: 'Live-Test',
        github: 'GitHub'
      },
      contact: {
        title: 'Kontaktieren Sie mich',
        description: 'Ermutigen Sie Menschen, Sie zu kontaktieren und beschreiben Sie, an welcher Rolle Sie interessiert sind. Zeigen Sie, dass Sie durch Ihre Arbeit einen Mehrwert für ihre Projekte schaffen werden. Beispiel: Fühlen Sie sich frei, sich mit Jobangeboten oder Möglichkeiten wie: ...',
        email: 'E-Mail',
        phone: 'Telefon',
        tel: 'Tel',
        yourName: 'Ihr Name',
        yourEmail: 'Ihre E-Mail',
        yourMessage: 'Ihre Nachricht',
        nameRequired: 'Ihr Name ist erforderlich.',
        emailRequired: 'E-Mail ist erforderlich.',
        invalidEmail: 'Ungültiges E-Mail-Format.',
        messageRequired: 'Nachricht ist erforderlich.',
        privacyPolicy: 'Datenschutzrichtlinie',
        privacyPolicyText: "Ich habe die <a href='/legal-notice' target='_blank'>Datenschutzrichtlinie</a> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
        privacyPolicyRequired: 'Bitte akzeptieren Sie die Datenschutzrichtlinie.',
        sendMessage: 'Nachricht senden',
        messageSent: 'Nachricht erfolgreich gesendet!',
        namePlaceholder: 'Ihr Name',
        emailPlaceholder: 'Ihre E-Mail',
        messagePlaceholder: 'Ihre Nachricht'
      },
      footer: {
        legalNotice: 'Impressum',
        copyright: '© Eileen Santos 2025',
        developer: 'Entwicklerin'
      }
    }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'EN' || savedLanguage === 'DE')) {
      this.currentLanguage$.next(savedLanguage);
    }
  }

  getCurrentLanguage(): Observable<Language> {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguageValue(): Language {
    return this.currentLanguage$.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguage$.next(language);
    localStorage.setItem('language', language);
  }

  getTranslations(): Translations {
    return this.translations[this.currentLanguage$.value];
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage$.value];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }
}
