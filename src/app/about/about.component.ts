import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';
import { TranslationService, Translations } from '../services/translation.service';

/**
 * About component displaying location and work preferences with animated text.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typedElement') typedElement!: ElementRef;
  
  currentIcon: string = '../../assets/Why_me_Section/Location.svg';
  fadeClass: string = 'fade-in';
  translations: Translations;
  private typed?: Typed;
  private previousIconIndex = 0;

  /**  
   * Initializes the about component and subscribes to language changes.
   */
  constructor(private translationService: TranslationService) {
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.translations = this.translationService.getTranslations();
      this.restartTyped();
    });
  }

  /**  
   * Lifecycle hook called after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.initTyped();
  }

  /**
   * Initializes the Typed.js instance with localized strings.
   */
  private initTyped(): void {
    const strings = this.getLocalizedStrings();
    const options = this.getTypedOptions(strings);
    this.typed = new Typed(this.typedElement.nativeElement, options);
  }

  /**
   * Gets localized strings based on current language.
   * @returns Array of localized strings.
   */
  private getLocalizedStrings(): string[] {
    const lang = this.translationService.getCurrentLanguageValue();
    return lang === 'EN' 
      ? [' located in Hannover..', ' open to work remote...']
      : [' in Hannover ansässig..', ' offen für Remote-Arbeit...'];
  }

  /**
   * Gets the Typed.js configuration options.
   * @param strings Array of strings to type.
   * @returns Typed.js options object.
   */
  private getTypedOptions(strings: string[]) {
    return {
      strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      contentType: 'html',
      preStringTyped: (arrayPos: number) => { this.changeIcon(arrayPos); }
    };
  }

  /**
   * Restarts the Typed.js instance with new configuration.
   */
  private restartTyped(): void {
    if (this.typed) {
      this.typed.destroy();
      if (this.typedElement) {
        this.initTyped();
      }
    }
  }

  /**
   * Changes the icon with fade animation.
   * @param index Icon index to display.
   */
  changeIcon(index: number): void {
    const newIcon = this.getIconPath(index);
    if (this.currentIcon === newIcon) return;
    this.fadeOutAndChangeIcon(newIcon, index);
  }

  /**
   * Gets the icon path based on index.
   * @param index Icon index.
   * @returns Icon path.
   */
  private getIconPath(index: number): string {
    return index === 0 
      ? '../../assets/Why_me_Section/Location.svg' 
      : '../../assets/Why_me_Section/Remote.svg';
  }

  /**
   * Fades out current icon and changes to new one.
   * @param newIcon New icon path.
   * @param index New icon index.
   */
  private fadeOutAndChangeIcon(newIcon: string, index: number): void {
    this.fadeClass = 'fade-out';
    setTimeout(() => {
      this.currentIcon = newIcon;
      this.previousIconIndex = index;
      this.fadeClass = 'fade-in';
    }, 200);
  }

  /**  
   * Lifecycle hook called when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
