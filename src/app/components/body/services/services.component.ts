import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Service {
  titleKey: string;
  descriptionKey: string;
  image: string;
  contact: {
    name: string;
    phone: string;
    whatsappUrl: string;
  };
  features: string[];
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: Service[] = [
    {
      titleKey: 'SERVICES.PRINTING_3D.TITLE',
      descriptionKey: 'SERVICES.PRINTING_3D.DESCRIPTION',
      image: 'assets/services/3D_printing.webp',
      contact: {
        name: 'Viviana',
        phone: '+51 936 359 169',
        whatsappUrl: 'https://api.whatsapp.com/send?phone=51936359169'
      },
      features: [
        'SERVICES.PRINTING_3D.FEATURE_1',
        'SERVICES.PRINTING_3D.FEATURE_2',
        'SERVICES.PRINTING_3D.FEATURE_3',
        'SERVICES.PRINTING_3D.FEATURE_4'
      ]
    }
  ];
}
