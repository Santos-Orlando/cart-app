import { Component, Input} from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items!: CartItem[];
  
}
