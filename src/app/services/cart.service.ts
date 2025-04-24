import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private totalItems = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItems.asObservable();
  totalItems$ = this.totalItems.asObservable();

  constructor() {
    // Inicializar el carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      this.cartItems.next(items);
      this.updateTotalItems();
    }
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, item]);
    }

    this.updateTotalItems();
    this.saveToLocalStorage();
  }

  removeFromCart(itemId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(updatedItems);
    this.updateTotalItems();
    this.saveToLocalStorage();
  }

  updateQuantity(itemId: number, quantity: number, item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === itemId);
    
    if (existingItem) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        existingItem.quantity = quantity;
        this.cartItems.next([...currentItems]);
        this.updateTotalItems();
        this.saveToLocalStorage();
      }
    } else if (quantity > 0) {
      this.addToCart(item);
    }
  }

  private updateTotalItems() {
    const total = this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems.next(total);
  }

  private saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  clearCart() {
    this.cartItems.next([]);
    this.totalItems.next(0);
    localStorage.removeItem('cart');
  }
} 