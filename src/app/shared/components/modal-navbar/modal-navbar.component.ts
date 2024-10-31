import {Component, input} from '@angular/core';
import {ActionModal} from '../../models/action-modal.model';

@Component({
  selector: 'app-modal-navbar',
  standalone: true,
  imports: [],
  templateUrl: './modal-navbar.component.html',
  styleUrl: './modal-navbar.component.css'
})
export class ModalNavbarComponent {

  actionsModal = input.required<ActionModal[]>();

   getIdTabModal(value: string): string {
    return value + '-action-modal-tab';
  }

   getIdContentTabModal(value: string): string {
    return value + '-action-modal-content';
  }

   getClassesFirstContentTabModal(first?: boolean) {
    return first ? 'show active' : '';
  }
}
