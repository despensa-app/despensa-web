import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {ActionModal} from '../../../../shared/models/action-modal.model';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [
    RouterLink,
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
