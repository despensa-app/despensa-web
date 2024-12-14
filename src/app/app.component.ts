import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {DataSidebar} from './models/data-sidebar';
import {SidebarService} from './services/layout/sidebar.service';
import {BrowserStorageService} from './services/layout/browser-storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly _sidebar: DataSidebar[] = [
    {
      id: 'shopping-list',
      path: '/',
      text: 'Listas de la compra'
    },
    {
      id: 'login',
      path: '/auth/login',
      text: 'Iniciar sesión'
    },
    {
      id: 'logout',
      click: () => this.logout(),
      text: 'Cerrar sesión',
      hide: true
    }
  ];

  constructor(
    private sidebarService: SidebarService,
    private browserStorageService: BrowserStorageService,
    private router: Router
  ) {
    this.sidebarService.setElements(this._sidebar);

    if (this.browserStorageService.getToken()) {
      this.sidebarService.showLogoutAndHideLogin();
    }
  }

  private logout(): void {
    this.browserStorageService.clear();
    this.sidebarService.showLoginAndHideLogout();
    this.router.navigate(['auth/login'])
        .then();
  }

}
