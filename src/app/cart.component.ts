import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from './services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  couponCode: string = '';
  discount: number = 0;
  discountedTotal: number = 0;

  // 🔑 NUEVO: feedback
  couponFeedback: string = '';
  couponSuccess: boolean = false;

  // 🔐 Suscripción (para liberar en OnDestroy)
  private cartSub!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSub = this.cartService.cartItems$.subscribe(cart => {
      this.items = cart;
      this.updateTotal();
    });
  }

  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

  updateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.updateDiscountedTotal();
  }

  // 🔄 CAMBIO: Reemplazamos la lógica del cupón por la validación pedida en el examen
  applyCoupon() {
    const code = this.couponCode.toUpperCase().trim();

    if (code.length < 8) {
      this.setInvalidCoupon('El cupón debe tener al menos 8 caracteres.');
      return;
    }

    const lastTwoChars = code.slice(-2);
    const discountNumber = Number(lastTwoChars);

    if (isNaN(discountNumber) || discountNumber <= 0 || discountNumber > 100) {
      this.setInvalidCoupon('El cupón debe terminar en dos números válidos (1-99).');
      return;
    }

    this.discount = discountNumber / 100;
    this.couponSuccess = true;
    this.couponFeedback = `Cupón aplicado: ${discountNumber}% de descuento`;

    this.updateDiscountedTotal();
  }

  // ✅ NUEVO: función auxiliar para manejar errores de cupón
  private setInvalidCoupon(message: string) {
    this.discount = 0;
    this.couponSuccess = false;
    this.couponFeedback = `❌ ${message}`;
    this.updateDiscountedTotal();
  }

  updateDiscountedTotal() {
    this.discountedTotal = this.total * (1 - this.discount);
  }

  changeQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item.id, quantity, item);
  }

  remove(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }
}
