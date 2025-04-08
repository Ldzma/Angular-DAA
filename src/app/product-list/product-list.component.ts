import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // Tasa de cambio: 1 USD = 7300 Gs (ajústala según necesites)
  private exchangeRate = 7900;

  products = [
    { 
      id: 1, 
      name: "Camiseta", 
      price: 10 * this.exchangeRate, 
      image: "assets/images/1.jpeg"
    },
    { 
      id: 2, 
      name: "Pantalón", 
      price: 13 * this.exchangeRate, 
      image: "assets/images/2.jpeg" 
    },
    { 
      id: 3, 
      name: "Zapatos", 
      price: 11 * this.exchangeRate, 
      image: "assets/images/3.jpeg" 
    },
    { 
      id: 4, 
      name: "Bolso", 
      price: 18 * this.exchangeRate, 
      image: "assets/images/4.jpeg" 
    }
  ];

  // Función para formatear con puntos como separador de miles
  formatPrice(price: number): string {
    return 'Gs ' + price.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}