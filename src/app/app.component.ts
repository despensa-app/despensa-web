import {Component, OnInit, viewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {DataSidebar} from './models/data-sidebar';
import {SidebarService} from './services/layout/sidebar.service';
import {BrowserStorageService} from './services/layout/browser-storage.service';
import {SpinnerComponent} from '@app/layout/spinner/spinner.component';
import {Toast} from 'primeng/toast';
import {MessagePrimeNgService} from '@app/services/external/message-prime-ng.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SpinnerComponent,
    Toast
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

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

  toast = viewChild(Toast);

  constructor(
    private sidebarService: SidebarService,
    private browserStorageService: BrowserStorageService,
    private router: Router,
    private messagePrimeNgService: MessagePrimeNgService
  ) {
    this.sidebarService.setElements(this._sidebar);

    if (this.browserStorageService.getToken()) {
      this.sidebarService.showLogoutAndHideLogin();
    }
  }

  ngOnInit(): void {
    this.messagePrimeNgService.setToastComponent(this.toast());
  }

  private logout(): void {
    this.browserStorageService.clear();
    this.sidebarService.showLoginAndHideLogout();
    this.router.navigate(['auth/login'])
        .then();
  }

}
