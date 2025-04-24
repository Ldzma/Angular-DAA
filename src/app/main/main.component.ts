import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService, CartItem } from '../services/cart.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      description: 'Último modelo con cámara de alta resolución',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'Potente laptop para profesionales',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 3,
      name: 'Camisa Casual',
      description: 'Camisa de algodón 100%',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    },
    {
      id: 4,
      name: 'Pantalón Jeans',
      description: 'Jeans clásicos de alta calidad',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    }
  ];

  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalItems$.subscribe(total => {
      this.totalItems = total;
    });
  }

  increaseQuantity(product: Product) {
    product.quantity++;
    this.updateCart(product);
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.updateCart(product);
    }
  }

  private updateCart(product: Product) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      category: product.category
    };

    this.cartService.updateQuantity(product.id, product.quantity, cartItem);
  }
}
