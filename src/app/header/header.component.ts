import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItems: number = 0;
  private storageListener: any;
  private checkInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.updateCartCount();

    // Crear un evento personalizado para escuchar cambios en el localStorage
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'cart') {
        this.updateCartCount();
      }
    };

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', this.storageListener);

    // Crear un intervalo para verificar cambios en el localStorage
    this.checkInterval = setInterval(() => {
      this.updateCartCount();
    }, 500);
  }

  ngOnDestroy(): void {
    // Limpiar el listener y el intervalo cuando el componente se destruye
    window.removeEventListener('storage', this.storageListener);
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  private updateCartCount(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      this.cartItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    } else {
      this.cartItems = 0;
    }
  }
}
