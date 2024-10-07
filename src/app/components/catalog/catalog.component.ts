import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {

  @Input() products! : Product[];

  @Output() addProductEventEmitter : EventEmitter<Product> = new EventEmitter();

  addProduct(product : Product){
    this.addProductEventEmitter.emit(product);
  }
 
}
