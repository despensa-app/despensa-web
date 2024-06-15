import {Component} from '@angular/core';
import {SidebarService} from '../../services/layout/sidebar.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(private sidebarService: SidebarService) {
  }

  getElements() {
    return this.sidebarService.getElements();
  }

}
