import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from "../catalog/catalog.component";
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { ItemState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items: CartItem[] = [];

  showCart : boolean = false;

  constructor(private store: Store<{items: ItemState}>,
              private sharingDataService: SharingDataService,
              private router: Router){
                this.store.select('items').subscribe(state => {
                  this.items = state.items;
                  this.saveSession();
                  console.log('cambio el estado');
                })
              }
  
  ngOnInit(): void {
    this.onDeleteCart();
    this.addProduct();
  }

  addProduct(){
    this.sharingDataService.addProductEventEmitter.subscribe(product => {
      this.store.dispatch(add({product: product}))
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Shopping",
        text: "¡Nuevo producto agregado al carro!",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void{
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
    
      Swal.fire({
        title: "¿Estaá seguro que desea eliminar?",
        text: "¡Cuidado el item se eliminará del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id: id}));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: "¡Eliminado!",
            text: "Se ha eliminado el item del carro de compras",
            icon: "success"
          });
        }
      });
    })
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
