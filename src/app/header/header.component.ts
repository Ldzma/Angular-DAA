import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,  // <-- ¡Importante!
  imports: [CommonModule], // Necesario para directivas como *ngFor
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  links = ['Inicio', 'Nosotros', 'Tienda', 'Ayuda'];
}