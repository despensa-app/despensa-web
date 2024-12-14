import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {NavbarComponent} from '@app/layout/navbar/navbar.component';
import {ActionModal} from '@app/shared/models/action-modal.model';

@Component({
  selector: 'app-add-products-navbar-shopping-list',
  standalone: true,
  imports: [
    ButtonModule,
    NavbarComponent
  ],
  templateUrl: './add-products-navbar-shopping-list.component.html',
  styleUrl: './add-products-navbar-shopping-list.component.css'
})
export class AddProductsNavbarShoppingListComponent {

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
            left: 'fas fa-dollar-sign',
            right: 'fas fa-angle-right'
          },
          title: 'Precio',
          disabled: true
        },
        {
          icon: {
            left: 'fas fa-tags',
            right: 'fas fa-angle-right'
          },
          title: 'Categoría',
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
          title: 'Título',
          disabled: true
        },
        {
          icon: {
            right: 'fas fa-long-arrow-alt-down'
          },
          title: 'Precio',
          disabled: true
        }
      ]
    }
  ];

}
