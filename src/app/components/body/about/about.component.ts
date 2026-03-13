import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  goToLink() {
    window.open('https://andina.pe/agencia/noticia-estudiantes-de-uni-usan-ia-para-control-rover-planetario-y-destacan-concurso-1046194.aspx', '_blank');
  }
}
