import {Component} from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
