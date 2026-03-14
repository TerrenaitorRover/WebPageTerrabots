import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  imports: [TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  goToAndina() {
    window.open('https://andina.pe/agencia/noticia-estudiantes-de-uni-usan-ia-para-control-rover-planetario-y-destacan-concurso-1046194.aspx', '_blank');
  }
}
