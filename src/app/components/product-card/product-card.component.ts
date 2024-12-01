import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[product-card]',
  standalone: true,
  imports: [],
  styleUrl: './product-card.component.css',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  
  @Input() product! : Product;
  @Input() base64Image: string = '';

  @Output() addProductEventEmitter : EventEmitter<Product> = new EventEmitter();

  onAddCart(product:Product){
    this.addProductEventEmitter.emit(product);
  }
  
  
}
