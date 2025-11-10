import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, AboutComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
