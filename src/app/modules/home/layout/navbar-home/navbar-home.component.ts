import {Component} from '@angular/core';
import {NavbarComponent} from '@app/layout/navbar/navbar.component';
import {ActionModal} from '@app/shared/models/action-modal.model';

@Component({
  selector: 'app-navbar-home',
  imports: [
    NavbarComponent
  ],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent {

  actionsModal: ActionModal[] = [
    {
      id: 'filter',
      tab: {
        icon: 'fas fa-filter',
        title: 'Filtrar',
        default: true
      },
      content: [
        {
          icon: {
            left: 'fas fa-calendar-alt',
            right: 'fas fa-angle-right'
          },
          title: 'Fecha',
          disabled: true
        },
        {
          icon: {
            left: 'fas fa-star',
            right: 'fas fa-angle-right'
          },
          title: 'Favoritos',
          disabled: true
        }
      ]
    },
    {
      id: 'sort',
      tab: {
        icon: 'fas fa-filter',
        title: 'Ordenar'
      },
      content: [
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Fecha de actualización',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Fecha de creación',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Título',
          disabled: true
        }
      ]
    }
  ];

}
