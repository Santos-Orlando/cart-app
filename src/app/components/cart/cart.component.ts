import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  
  @Input() items: CartItem[] = [];
  
  total: number = 0;

  constructor(private sharingDataService: SharingDataService, 
              private store: Store<{items: ItemState}>){
                this.store.select('items').subscribe(state =>{
                    this.items = state.items;
                    this.total = state.total;
                  });
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);
  }

}
