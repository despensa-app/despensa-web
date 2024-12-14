import {Component, computed, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ModalNavbarComponent} from '@app/shared/components/modal-navbar/modal-navbar.component';
import {ActionModal} from '@app/shared/models/action-modal.model';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    ModalNavbarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  actionsModal = input<ActionModal[]>([]);
  disableActions = input<boolean>();
  disableActionsButton = computed(() => this.disableActions() || this.actionsModal().length === 0 ? true : null);

  constructor() {
  }
}
