import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DataSidebar} from './models/data-sidebar';
import {SidebarService} from './services/layout/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
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
