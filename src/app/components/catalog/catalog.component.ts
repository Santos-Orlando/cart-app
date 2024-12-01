import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit{

  products! : Product[];
  base64Images: { [key: number]: string } = {};

  constructor(private store: Store<{products: any}>,
              private sharingData: SharingDataService){
                this.store.select('products').subscribe(state => {this.products = state.products
                this.products.forEach(product => this.loadBase64Image(product));
              });
            }

  ngOnInit(): void {
    this.store.dispatch(load());
  }

  addProduct(product : Product){
    this.sharingData.addProductEventEmitter.emit(product);
  }
 
  async loadBase64Image(product: Product) {
    try {
      const response = await fetch(product.imageUrl);
      let base64String = await response.text();
  
      base64String = base64String.replace(/\s/g, '');
  
      this.base64Images[product.id] = `data:image/png;base64,${base64String}`;
    } catch (error) {
      console.error(`Error loading image for product ${product.id}:`, error);
    }
  }
}
