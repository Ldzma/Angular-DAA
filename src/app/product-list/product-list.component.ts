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
  private exchangeRate = 7800;

  products = [
    { 
      id: 1, 
      name: "Remeras", 
      price: 11 * this.exchangeRate, 
      image: "assets/images/1.jpeg"
    },
    { 
      id: 2, 
      name: "Cargo Pants", 
      price: 14 * this.exchangeRate, 
      image: "assets/images/2.jpeg" 
    },
    { 
      id: 3, 
      name: "Shoes", 
      price: 40 * this.exchangeRate, 
      image: "assets/images/3.jpeg" 
    },
    { 
      id: 4, 
      name: "Bags", 
      price: 17 * this.exchangeRate, 
      image: "assets/images/4.jpeg" 
    }
  ];

  // Función para formatear con puntos como separador de miles
  formatPrice(price: number): string {
    return 'Gs ' + price.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}