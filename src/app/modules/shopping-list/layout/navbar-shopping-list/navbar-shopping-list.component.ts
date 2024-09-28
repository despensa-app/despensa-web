import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {ButtonModule} from 'primeng/button';
import {ActionModal} from '../../../../shared/models/action-modal.model';

@Component({
  selector: 'app-navbar-shopping-list',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    ButtonModule
  ],
  templateUrl: './navbar-shopping-list.component.html',
  styleUrl: './navbar-shopping-list.component.css'
})
export class NavbarShoppingListComponent {

  isNew = input.required<boolean>();

  @Output() deleteShoppingList = new EventEmitter<void>();

  actionsModal: ActionModal[] = [
    {
      id: 'filter',
      tab: {
        icon: 'fas fa-filter',
        title: 'Filtrar'
      },
      content: [
        {
          icon: {
            left: 'fas fa-tags',
            right: 'fas fa-angle-right'
          },
          title: 'Categorías',
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
        icon: 'fas fa-sort',
        title: 'Ordenar'
      },
      content: [
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Fecha',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Título',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Precio',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Marcados',
          disabled: true
        }
      ]
    },
    {
      id: 'more',
      tab: {
        icon: 'fas fa-th-large',
        title: 'Más',
        default: true
      },
      content: [
        {
          icon: {
            left: 'fas fa-clone'
          },
          title: 'Duplicar lista',
          disabled: true
        },
        {
          icon: {
            left: 'fas fa-trash'
          },
          title: 'Eliminar lista'
        }
      ]
    }
  ];

}
