import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Coupon {
    code: string;
    discount: number;
}

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        RouterModule,
        MatFormFieldModule
    ],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    total: number = 0;
    subtotal: number = 0;
    discount: number = 0;
    couponCode: string = '';
    appliedCoupon: Coupon | null = null;
    availableCoupons: Coupon[] = [
        { code: 'DESCUENTO10', discount: 10 },
        { code: 'DESCUENTO20', discount: 20 },
        { code: 'DESCUENTO30', discount: 30 }
    ];

    constructor(private snackBar: MatSnackBar) {
        this.loadCartFromLocalStorage();
    }

    ngOnInit(): void {
        this.calculateTotal();
    }

    private loadCartFromLocalStorage(): void {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
        }
    }

    private saveCartToLocalStorage(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    private calculateTotal(): void {
        this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.discount = this.appliedCoupon ? (this.subtotal * this.appliedCoupon.discount) / 100 : 0;
        this.total = this.subtotal - this.discount;
    }

    validateCoupon(code: string): boolean {
        // Verificar longitud mínima de 8 caracteres
        if (code.length < 8) {
            this.showMessage('El código debe tener al menos 8 caracteres');
            return false;
        }

        // Verificar que los últimos 2 caracteres sean números
        const lastTwoChars = code.slice(-2);
        if (!/^\d{2}$/.test(lastTwoChars)) {
            this.showMessage('Los últimos 2 caracteres deben ser números');
            return false;
        }

        // Verificar que el código comience con "DESCUENTO"
        if (!code.startsWith('DESCUENTO')) {
            this.showMessage('El código debe comenzar con "DESCUENTO"');
            return false;
        }

        return true;
    }

    applyCoupon(): void {
        const code = this.couponCode.toUpperCase();

        if (this.validateCoupon(code)) {
            const discount = parseInt(code.slice(-2));
            this.appliedCoupon = { code, discount };
            this.calculateTotal();
            this.showMessage(`¡Cupón aplicado! Descuento del ${discount}%`);
        }
    }

    removeCoupon(): void {
        this.appliedCoupon = null;
        this.couponCode = '';
        this.calculateTotal();
        this.showMessage('Cupón removido');
    }

    private showMessage(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    updateQuantity(item: CartItem, newQuantity: number): void {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            this.calculateTotal();
            this.saveCartToLocalStorage();
        }
    }

    removeItem(itemId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.calculateTotal();
        this.saveCartToLocalStorage();
    }

    addToCart(item: CartItem): void {
        const existingItem = this.cartItems.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({ ...item, quantity: 1 });
        }
        this.calculateTotal();
        this.saveCartToLocalStorage();
    }
} 