import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  
  @Input() items: CartItem[] = [];
  
  total: number = 0;
  
  idProductEventEmitter : EventEmitter<number> = new EventEmitter();
  
  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }

}
