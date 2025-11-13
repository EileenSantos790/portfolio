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
  legalNotice: {
    title: string;
    imprint: string;
    contact: string;
    email: string;
    acceptanceOfTerms: string;
    acceptanceOfTermsText: string;
    scopeAndOwnership: string;
    scopeAndOwnershipText1: string;
    scopeAndOwnershipText2: string;
    proprietaryRights: string;
    proprietaryRightsText: string;
    useOfProduct: string;
    useOfProductText: string;
    disclaimerOfWarranties: string;
    disclaimerOfWarrantiesText: string;
    indemnity: string;
    indemnityText: string;
    questionsText: string;
    date: string;
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
      },
      legalNotice: {
        title: 'Legal Notice',
        imprint: 'Imprint',
        contact: 'Exploring the Board',
        email: 'Email',
        acceptanceOfTerms: 'Acceptance of terms',
        acceptanceOfTermsText: 'By accessing and using Portfolio (Product), you acknowledge and agree to the following terms and conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.',
        scopeAndOwnership: 'Scope and ownership of the product',
        scopeAndOwnershipText1: 'Portfolio has been developed as part of a student group project in a web development bootcamp at the Developer Akademie GmbH. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.',
        scopeAndOwnershipText2: 'The design of Portfolio is owned by the Developer Akademie GmbH. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.',
        proprietaryRights: 'Proprietary rights',
        proprietaryRightsText: 'Aside from the design owned by Developer Akademie GmbH, we, the listed students, retain all proprietary rights in Portfolio, including any associated copyrighted material, trademarks, and other proprietary information.',
        useOfProduct: 'Use of the product',
        useOfProductText: 'Portfolio is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use of Portfolio for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are solely responsible for your interactions with other users of Portfolio.',
        disclaimerOfWarranties: 'Disclaimer of warranties and limitation of liability',
        disclaimerOfWarrantiesText: 'Portfolio is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we, the listed students, or the Developer Akademie, be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection with the use or performance of Portfolio.',
        indemnity: 'Indemnity',
        indemnityText: 'You agree to indemnify, defend and hold harmless us, the listed students, the Developer Akademie, and our affiliates, partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or relating to your use of Portfolio and/or your breach of this Legal Notice.',
        questionsText: 'For any questions or notices, please contact us at',
        date: 'Date: Nov 13, 2025'
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
        description: 'Ich bin leidenschaftlich am Programmieren interessiert, weil es mir ermöglicht, Ideen in echte, funktionierende Lösungen zu verwandeln. Ich genieße den analytischen Prozess, komplexe Probleme zu zerlegen und kreative, effiziente Wege zu finden, sie zu lösen. Das Programmieren fordert mich ständig heraus zu lernen, mich zu verbessern und anders zu denken. Ich schätze auch die kollaborative Seite der Entwicklung – Ideen zu teilen, mit anderen zu bauen und zu sehen, wie Teamarbeit etwas Größeres schaffen kann als die Summe ihrer Teile.',
        letsTalk: 'Lass uns sprechen'
      },
      skills: {
        title: 'Meine Fähigkeiten',
        currentlyLearning: 'Ich lerne derzeit',
        motivationalText: 'Die gesuchte Fähigkeit nicht gefunden? Ich bin immer motiviert, neue Bereiche zu lernen und mein Fachwissen zu erweitern.',
        letsTalk: 'Lass uns sprechen'
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
        description: 'Zögern Sie nicht, mich mit Möglichkeiten wie Frontend-Entwickler- oder Web-Entwickler-Positionen zu kontaktieren. Ich bin leidenschaftlich daran interessiert, saubere, responsive und benutzerzentrierte Web-Erlebnisse zu schaffen, die einen Unterschied machen. Lassen Sie uns in Kontakt treten und etwas Großartiges schaffen!',
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
        sendMessage: 'Senden',
        messageSent: 'Nachricht erfolgreich gesendet!',
        namePlaceholder: 'Ihr Name',
        emailPlaceholder: 'Ihre E-Mail',
        messagePlaceholder: 'Ihre Nachricht'
      },
      footer: {
        legalNotice: 'Impressum',
        copyright: '© Eileen Santos 2025',
        developer: 'Entwicklerin'
      },
      legalNotice: {
        title: 'Impressum',
        imprint: 'Impressum',
        contact: 'Kontaktaufnahme',
        email: 'E-Mail',
        acceptanceOfTerms: 'Annahme der Bedingungen',
        acceptanceOfTermsText: 'Durch den Zugriff auf und die Nutzung von Portfolio (Produkt) erkennen Sie die folgenden Geschäftsbedingungen sowie alle Richtlinien, Leitfäden oder Änderungen an, die Ihnen von Zeit zu Zeit vorgelegt werden können. Wir, die aufgeführten Studenten, können die Geschäftsbedingungen von Zeit zu Zeit ohne Vorankündigung aktualisieren oder ändern.',
        scopeAndOwnership: 'Umfang und Eigentum am Produkt',
        scopeAndOwnershipText1: 'Portfolio wurde als Teil eines Studenten-Gruppenprojekts in einem Webentwicklungs-Bootcamp bei der Developer Akademie GmbH entwickelt. Es dient Bildungszwecken und ist nicht für umfangreiche persönliche und geschäftliche Nutzung vorgesehen. Daher können wir keine konsistente Verfügbarkeit, Zuverlässigkeit, Genauigkeit oder andere Qualitätsaspekte dieses Produkts garantieren.',
        scopeAndOwnershipText2: 'Das Design von Portfolio gehört der Developer Akademie GmbH. Die unbefugte Nutzung, Reproduktion, Modifikation, Verbreitung oder Replikation des Designs ist strengstens untersagt.',
        proprietaryRights: 'Eigentumsrechte',
        proprietaryRightsText: 'Abgesehen vom Design, das der Developer Akademie GmbH gehört, behalten wir, die aufgeführten Studenten, alle Eigentumsrechte an Portfolio, einschließlich aller damit verbundenen urheberrechtlich geschützten Materialien, Marken und anderen geschützten Informationen.',
        useOfProduct: 'Nutzung des Produkts',
        useOfProductText: 'Portfolio ist nur für rechtmäßige Zwecke in Übereinstimmung mit allen geltenden Gesetzen und Vorschriften zu verwenden. Jegliche Nutzung von Portfolio für illegale Aktivitäten oder um eine andere Person zu belästigen, zu schädigen, zu bedrohen oder einzuschüchtern, ist strengstens untersagt. Sie sind allein verantwortlich für Ihre Interaktionen mit anderen Nutzern von Portfolio.',
        disclaimerOfWarranties: 'Haftungsausschluss und Haftungsbeschränkung',
        disclaimerOfWarrantiesText: 'Portfolio wird "wie besehen" ohne jegliche Gewährleistung bereitgestellt, weder ausdrücklich noch stillschweigend, einschließlich, aber nicht beschränkt auf die stillschweigenden Gewährleistungen der Marktgängigkeit, Eignung für einen bestimmten Zweck und Nichtverletzung. In keinem Fall haften wir, die aufgeführten Studenten oder die Developer Akademie, für direkte, indirekte, zufällige, besondere, Folge- oder exemplarische Schäden, einschließlich, aber nicht beschränkt auf Schäden für Gewinnverluste, Geschäftswert, Nutzung, Daten oder andere immaterielle Verluste, selbst wenn wir auf die Möglichkeit solcher Schäden hingewiesen wurden, die sich aus oder im Zusammenhang mit der Nutzung oder Leistung von Portfolio ergeben.',
        indemnity: 'Freistellung',
        indemnityText: 'Sie verpflichten sich, uns, die aufgeführten Studenten, die Developer Akademie und unsere verbundenen Unternehmen, Partner, leitenden Angestellten, Direktoren, Vertreter und Mitarbeiter von allen Ansprüchen, Forderungen, Verlusten, Schäden, Kosten oder Haftungen (einschließlich angemessener Anwaltsgebühren) freizustellen, zu verteidigen und schadlos zu halten, die sich aus oder im Zusammenhang mit Ihrer Nutzung von Portfolio und/oder Ihrer Verletzung dieser rechtlichen Hinweise ergeben.',
        questionsText: 'Für Fragen oder Mitteilungen kontaktieren Sie uns bitte unter',
        date: 'Datum: 13. Nov. 2025'
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
