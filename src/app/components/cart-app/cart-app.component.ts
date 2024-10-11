import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CatalogComponent } from "../catalog/catalog.component";
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items: CartItem[] = [];

  total: number = 0; 

  showCart : boolean = false;

  constructor(private sharingDataService: SharingDataService,
              private service : ProductService,
              private router: Router){}
  
  ngOnInit(): void {
    // this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]') ;
    // this.calculateTotal();
    this.onDeleteCart();
    this.addProduct();
  }

  addProduct(){
    this.sharingDataService.addProductEventEmitter.subscribe(product => {
      
      // this.calculateTotal(); 
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: {
          items : this.items,
          total: this.total
        }
      });
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
          
          // this.calculateTotal(); 
          this.saveSession();

          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
            this.router.navigate(['/cart'], {
              state: {
                items : this.items,
                total: this.total
              }
            });
          })

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
