import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,  // <-- ¡Importante!
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  goToShop() {
    console.log('Redirigiendo a la tienda...');
  }
}