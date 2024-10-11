import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';

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

  constructor(private router: Router){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }

}
