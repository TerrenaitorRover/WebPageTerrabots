import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false;
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchLang() {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
    this.translate.use(this.currentLang);
  }
}
