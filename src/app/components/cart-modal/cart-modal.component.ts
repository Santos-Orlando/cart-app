import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];

  // @Input() total: number = 0;

  @Output() closeEventEmitter : EventEmitter<boolean> = new EventEmitter();

  @Output() idProductEventEmitter : EventEmitter<number> = new EventEmitter();

  closeCart(): void{
    this.closeEventEmitter.emit();
  }

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }
}
