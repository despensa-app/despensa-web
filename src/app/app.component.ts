import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {DataSidebar} from './models/data-sidebar';
import {SidebarService} from './services/layout/sidebar.service';
import {BrowserStorageService} from './services/layout/browser-storage.service';

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
    },
    {
      path: '/auth/login',
      text: 'Iniciar sesión'
    },
    {
      click: () => this.logout(),
      text: 'Cerrar sesión'
    }
  ];

  constructor(
    private sidebarService: SidebarService,
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {
    this.sidebarService.setElements(this._sidebar);
  }

  private logout(): void {
    this.browserStorageService.clear();
    this.router.navigate(['auth/login'])
        .then();
  }

}
