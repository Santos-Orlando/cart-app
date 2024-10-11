import { Component, Input} from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items!: CartItem[];
  
}
