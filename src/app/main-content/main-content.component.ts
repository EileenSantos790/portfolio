import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, HeroComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
