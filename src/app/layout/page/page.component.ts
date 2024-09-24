import {Component} from '@angular/core';
import {ModalNavbarComponent} from '../../shared/components/modal-navbar/modal-navbar.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    ModalNavbarComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
