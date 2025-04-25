import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
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
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SharedModule, 
    MatButtonModule, 
    MatIconModule, 
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    // Electrónicos
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
    // Ropa
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
    },
    // Hogar
    {
      id: 5,
      name: 'Lámpara LED',
      description: 'Lámpara moderna y eficiente',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    {
      id: 6,
      name: 'Sofá Moderno',
      description: 'Sofá cómodo y elegante',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    // Deportes
    {
      id: 7,
      name: 'Balón de Fútbol',
      description: 'Balón profesional',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    },
    {
      id: 8,
      name: 'Raqueta de Tenis',
      description: 'Raqueta profesional',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1617083279583-4c4a5a5a5b5a?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    },
    // Libros
    {
      id: 9,
      name: 'Novela Bestseller',
      description: 'Libro más vendido del año',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Libros'
    },
    {
      id: 10,
      name: 'Libro de Cocina',
      description: 'Recetas internacionales',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Libros'
    },
    // Juguetes
    {
      id: 11,
      name: 'Juego de Mesa',
      description: 'Juego familiar divertido',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Juguetes'
    },
    {
      id: 12,
      name: 'Peluche',
      description: 'Peluche suave y adorable',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1562040506-a9b32cb51b94?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Juguetes'
    },
    // Música
    {
      id: 13,
      name: 'Guitarra Acústica',
      description: 'Guitarra de alta calidad',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Música'
    },
    {
      id: 14,
      name: 'Piano Digital',
      description: 'Piano con 88 teclas',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Música'
    },
    // Jardín
    {
      id: 15,
      name: 'Set de Jardinería',
      description: 'Herramientas profesionales',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Jardín'
    },
    {
      id: 16,
      name: 'Planta Decorativa',
      description: 'Planta de interior',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Jardín'
    },
    // Productos adicionales
    {
      id: 17,
      name: 'Monitor Gaming',
      description: 'Monitor de alta frecuencia para gaming',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 18,
      name: 'Teclado Mecánico',
      description: 'Teclado gaming con switches mecánicos',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 19,
      name: 'Abrigo de Invierno',
      description: 'Abrigo cálido y elegante',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    },
    {
      id: 20,
      name: 'Zapatillas Deportivas',
      description: 'Zapatillas para running',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    },
    {
      id: 21,
      name: 'Mesa de Centro',
      description: 'Mesa moderna para sala',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26f?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    {
      id: 22,
      name: 'Silla Ergonómica',
      description: 'Silla de oficina ergonómica',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    {
      id: 23,
      name: 'Bicicleta de Montaña',
      description: 'Bicicleta todo terreno',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    },
    {
      id: 24,
      name: 'Pesas de Gimnasio',
      description: 'Set de pesas para entrenamiento',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    },
    {
      id: 25,
      name: 'Libro de Programación',
      description: 'Guía completa de desarrollo web',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Libros'
    },
    {
      id: 26,
      name: 'Libro de Historia',
      description: 'Historia del mundo moderno',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Libros'
    },
    {
      id: 27,
      name: 'Lego Set',
      description: 'Set de construcción creativa',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Juguetes'
    },
    {
      id: 28,
      name: 'Robot Educativo',
      description: 'Robot programable para niños',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Juguetes'
    },
    {
      id: 29,
      name: 'Batería Electrónica',
      description: 'Batería digital profesional',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Música'
    },
    {
      id: 30,
      name: 'Micrófono Profesional',
      description: 'Micrófono para streaming',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Música'
    },
    {
      id: 31,
      name: 'Maceta Decorativa',
      description: 'Maceta moderna para plantas',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Jardín'
    },
    {
      id: 32,
      name: 'Set de Riego',
      description: 'Sistema de riego automático',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Jardín'
    },
    {
      id: 33,
      name: 'Tablet Pro',
      description: 'Tablet de última generación',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 34,
      name: 'Auriculares Inalámbricos',
      description: 'Auriculares con cancelación de ruido',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Electrónicos'
    },
    {
      id: 35,
      name: 'Vestido de Fiesta',
      description: 'Vestido elegante para ocasiones especiales',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    },
    {
      id: 36,
      name: 'Chaqueta de Cuero',
      description: 'Chaqueta de cuero genuino',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Ropa'
    },
    {
      id: 37,
      name: 'Lámpara de Pie',
      description: 'Lámpara moderna para sala',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    {
      id: 38,
      name: 'Cortinas Blackout',
      description: 'Cortinas para oscurecer habitación',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Hogar'
    },
    {
      id: 39,
      name: 'Raqueta de Badminton',
      description: 'Raqueta profesional de badminton',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1617083279583-4c4a5a5a5b5a?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    },
    {
      id: 40,
      name: 'Pelota de Baloncesto',
      description: 'Balón oficial de baloncesto',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1546519638-68e109acd27b?w=500&h=300&fit=crop',
      quantity: 0,
      category: 'Deportes'
    }
  ];

  categories: string[] = [];
  selectedCategory: string = 'all';
  totalItems: number = 0;

  constructor(private cartService: CartService) {
    this.categories = [...new Set(this.products.map(product => product.category))];
  }

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

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    return this.selectedCategory === 'all' 
      ? this.products 
      : this.products.filter(product => product.category === this.selectedCategory);
  }
}
