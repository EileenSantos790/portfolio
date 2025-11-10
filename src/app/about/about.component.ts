import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';

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
  private typed?: Typed;
  private previousIconIndex = 0;

  ngAfterViewInit(): void {
    const options = {
      strings: [
        ' located in Hannover..',
        ' open to work remote...'
      ],
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
