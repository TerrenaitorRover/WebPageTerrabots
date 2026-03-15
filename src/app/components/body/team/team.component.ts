import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  career: string;
  role: string;
  photo: string;
  linkedin?: string;
}

interface TeamSection {
  title: string;
  ringColor: string;
  members: TeamMember[];
}

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  sections: TeamSection[] = [
    {
      title: 'Principal Professor',
      ringColor: 'ring-yellow-400',
      members: [
        {
          name: 'Uwe Rojas Villanueva',
          career: 'PhD in Electrical Engineering – Electromagnetism',
          role: 'Principal Professor',
          photo: 'assets/team/principal-professor/uwe-rojas-villanueva.png',
          linkedin: 'https://www.linkedin.com/in/uwe-rojas-villanueva-a0a02050/'
        }
      ]
    },
    {
      title: 'Advisors',
      ringColor: 'ring-blue-400',
      members: [
        {
          name: 'Johan Edilberto Quispe Navarrete',
          career: 'PhD in Science: Mechanics, Acoustics, Electronics and Robotics',
          role: 'Advisor',
          photo: 'assets/team/advisors/johan-quispe-navarrete.png',
          linkedin: 'https://www.linkedin.com/in/johan-quispe-ph-d-459799b5/'
        },
        {
          name: 'Edgar Eduardo Medina Castañeda',
          career: 'Master of Science in Electrical Engineering',
          role: 'Advisor',
          photo: 'assets/team/advisors/edgar-medina-castaneda.png',
          linkedin: 'https://www.linkedin.com/in/emedinac/'
        }
      ]
    },
    {
      title: 'Leadership',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Patrick Fabrizio Echevarria Duran',
          career: 'Electronic Engineering - UNI',
          role: 'Team Leader',
          photo: 'assets/team/leadership/patrick-echevarria-duran.png',
          linkedin: 'https://www.linkedin.com/in/patrick-fabrizio-echevarria-duran-288196212/'
        },
        {
          name: 'Viviana Ofelia Ventura Condo',
          career: 'Engineering Physics - UNI',
          role: 'Science Leader',
          photo: 'assets/team/leadership/viviana-ventura-condo.jpg',
          linkedin: 'https://www.linkedin.com/in/viviana-ventura/'
        },
        {
          name: 'Angel Samir Pucho Quispe',
          career: 'Electronic Engineering - UNI',
          role: 'Technical Leader',
          photo: 'assets/team/leadership/angel-pucho-quispe.jpg',
          linkedin: 'https://www.linkedin.com/in/angel-samir-pucho-quispe'
        },
        {
          name: 'Yuliveth Del Valle Jardin Goitia',
          career: 'Mechanical-Electrical Engineering - UNI',
          role: 'PR & Social Media',
          photo: 'assets/team/leadership/yuliveth-jardin-goitia.jpg',
          linkedin: 'https://www.linkedin.com/in/yulivethjardin/'
        }
      ]
    },
    {
      title: 'Artificial Intelligence',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Sergio Alonso Ortiz Pauca',
          career: 'Mechatronics Engineering - PUCP',
          role: 'Leader',
          photo: 'assets/team/ia/sergio-ortiz-pauca.png',
          linkedin: 'https://www.linkedin.com/in/sergio-ortizp/'
        },
        {
          name: 'Jared Aristóteles Orihuela Contreras',
          career: 'Computer Science - UNI',
          role: 'Member',
          photo: 'assets/team/ia/jared-orihuela-contreras.jpg',
          linkedin: 'https://www.linkedin.com/in/jared-orihuela-contreras-2b3660259/'
        },
        {
          name: 'Rodney Lopez Loja',
          career: 'Computer Science - UNI',
          role: 'Member',
          photo: 'assets/team/ia/rodney-lopez-loja.jpg',
          linkedin: 'https://www.linkedin.com/in/rodll/'
        }
      ]
    },
    {
      title: 'Science',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Christian Omar Calderón Chávez',
          career: 'Geological Engineering - UNI',
          role: 'Geology Lead',
          photo: 'assets/team/science/christian-calderon-chavez.png',
          linkedin: 'https://www.linkedin.com/in/christian-omar-calder%C3%B3n-ch%C3%A1vez-a25703345'
        }
      ]
    },
    {
      title: 'Electronics',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Camilo Roger Callupe Menejes',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/electronica/camilo-callupe-menejes.png',
          linkedin: 'https://www.linkedin.com/in/camilo-roger-callupe-menejes/'
        },
        {
          name: 'Jose Luis Gutierrez',
          career: 'Engineering Physics - UNI',
          role: 'Member',
          photo: 'assets/team/electronica/jose-gutierrez.png',
          linkedin: 'https://www.linkedin.com/in/jose-luis-valentino-gutierrez-alca-98734a3b7'
        },
        {
          name: 'Oliver Jean Pier Beizaga Chauca',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/electronica/oliver-beizaga-chauca.jpeg',
          linkedin: 'https://www.linkedin.com/in/oliver-jean-pier-beizaga-chauca-a188182a8/'
        },
        {
          name: 'Jhon Yunior Vargas Basurco',
          career: 'Electronic Engineering - UNSAAC',
          role: 'Member',
          photo: 'assets/team/electronica/jhon-vargas-basurco.jpeg',
          linkedin: 'https://www.linkedin.com/in/jhon-yunior-vargas-basurco-79609b332'
        },
        {
          name: 'Victor Eduardo Colque Pacompia',
          career: 'Electronic Engineering - UNAP',
          role: 'Member',
          photo: 'assets/team/electronica/Victor_Eduardo_Colque.jpg',
          linkedin: 'https://www.linkedin.com/in/victor-eduardo-colque-pacompia-862b47205/'
        }
      ]
    },
    {
      title: 'Mechanics',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'José Miguel Rafael Rafael',
          career: 'Naval Engineering - UNI',
          role: 'Leader',
          photo: 'assets/team/mecanica/jose-rafael-rafael.jpg',
          linkedin: 'https://www.linkedin.com/in/jose-rafael-27162b152/'
        },
        {
          name: 'Josue Enrique Quiñe Espinoza',
          career: 'Mechatronics Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/mecanica/Josue_Enrique_Quiñe_Espinoza.jpg',
          linkedin: 'https://www.linkedin.com/in/josue-enrique-qui%C3%B1e-espinoza-70a6653b7/'
        },
        {
          name: 'Paul Mahler Cusi Huaman',
          career: 'Mechanical and Electrical Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/mecanica/Paul_Mahler_Cusi_Huaman.jpg',
          linkedin: 'https://www.linkedin.com/in/paul-cusi-huaman-38b162147/'
        },
        {
          name: 'Flavia Fernanda Cavero Benites',
          career: 'Engineering Physics - UNI',
          role: 'Member',
          photo: 'assets/team/mecanica/Flavia_Fernanda_Cavero_Benites.jpeg'
        }
      ]
    },
    {
      title: 'Drone',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Jhon Antony Zelada Rodriguez',
          career: 'Electronic Engineering - UNI',
          role: 'Leader',
          photo: 'assets/team/drone/jhon-zelada-rodriguez.png',
          linkedin: 'https://www.linkedin.com/in/jhon-zelada/'
        },
        {
          name: 'Marco Jesus Prado Vasquez',
          career: 'Electronic Engineering - UPN',
          role: 'Member',
          photo: 'assets/team/drone/marco-prado-vasquez.png',
          linkedin: 'https://www.linkedin.com/in/pradovasquezm'
        },
        {
          name: 'Piero Fabrizio Ampuero Bazalar',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/drone/piero-ampuero-bazalar.png',
          linkedin: 'https://www.linkedin.com/in/piero-fabrizio-ampuero-bazalar-78977b35a'
        },
        {
          name: 'Horacio Eduardo Zerpa Diaz',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/drone/Horacio_Eduardo_Zerpa_Diaz.jpeg'
        }
      ]
    },
    {
      title: 'Ground Station',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Julio Adriano Noliz Vivanco',
          career: 'Electronic Engineering - UNI',
          role: 'Leader',
          photo: 'assets/team/gs/julio-noliz-vivanco.png',
          linkedin: 'https://www.linkedin.com/in/julio-adriano-noliz-vivanco-813564308/'
        },
        {
          name: 'Gabriel Adrian Martinez Barrios',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/gs/gabriel-martinez-barrios.jpg',
          linkedin: 'https://www.linkedin.com/in/gabriel-martinez-barrios-a25364388/'
        },
        {
          name: 'Paolo Fabrizio Milla Toro',
          career: 'Electronic Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/gs/paolo-milla-toro.png',
          linkedin: 'https://www.linkedin.com/in/paolo-milla-toro-8018b12ba/'
        },
        {
          name: 'Erly Gabriel Yupanqui Aguilar',
          career: 'Telecommunications Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/gs/erly-yupanqui-aguilar.png',
          linkedin: 'https://www.linkedin.com/in/erly-gabriel-yupanqui-aguilar-a224171a1'
        },
        {
          name: 'Antonio Alejandro Saenz Camero',
          career: 'Telecommunications Engineering - UNI',
          role: 'Member',
          photo: 'assets/team/gs/Antonio_Saenz_Camero.jpeg',
          linkedin: 'https://www.linkedin.com/in/antonio-saenz-camero-3a80a228a/'
        }
      ]
    },
    {
      title: 'Website',
      ringColor: 'ring-emerald-400',
      members: [
        {
          name: 'Carlos Felix Garay Haro',
          career: 'Telecommunications Engineering - UNI',
          role: 'Leader',
          photo: 'assets/team/website/carlos-garay-haro.png',
          linkedin: 'https://pe.linkedin.com/in/carlos-felix-garay-haro'
        }
      ]
    }
  ];
}
