import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';
import { TranslationService, Translations } from '../services/translation.service';

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

  constructor(private translationService: TranslationService) {
    this.translations = this.translationService.getTranslations();
    
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.translations = this.translationService.getTranslations();
      this.restartTyped();
    });
  }

  ngAfterViewInit(): void {
    this.initTyped();
  }

  private initTyped(): void {
    const lang = this.translationService.getCurrentLanguageValue();
    const strings = lang === 'EN' 
      ? [' located in Hannover..', ' open to work remote...']
      : [' in Hannover ansässig..', ' offen für Remote-Arbeit...'];

    const options = {
      strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      contentType: 'html',
      preStringTyped: (arrayPos: number) => {
        this.changeIcon(arrayPos);
      }
    };
    
    this.typed = new Typed(this.typedElement.nativeElement, options);
  }

  private restartTyped(): void {
    if (this.typed) {
      this.typed.destroy();
      if (this.typedElement) {
        this.initTyped();
      }
    }
  }

  changeIcon(index: number): void {
    const newIcon = index === 0 
      ? '../../assets/Why_me_Section/Location.svg' 
      : '../../assets/Why_me_Section/Remote.svg';
    
    if (this.currentIcon === newIcon) {
      return;
    }
    
    this.fadeClass = 'fade-out';
    
    setTimeout(() => {
      this.currentIcon = newIcon;
      this.previousIconIndex = index;
      this.fadeClass = 'fade-in';
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
