import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {DataSidebar} from './models/data-sidebar';
import {SidebarService} from './services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly _sidebar: DataSidebar[] = [
    {
      path: '/',
      text: 'Listas de la compra'
    }
  ];

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.setElements(this._sidebar);
  }

}
