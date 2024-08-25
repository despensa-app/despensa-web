import {Injectable, signal} from '@angular/core';
import {DataSidebar} from '../../models/data-sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private elements = signal<DataSidebar[]>([]);

  constructor() {
  }

  setElements(elements: DataSidebar[]) {
    this.elements.set(elements);
  }

  getElements() {
    return this.elements();
  }

  showHideElementLoginLogout() {
    this.elements.update(value => {
      value.forEach(element => {
        if (element.id === 'login') {
          element.hide = !element.hide;
        }

        if (element.id === 'logout') {
          element.hide = !element.hide;
        }
      });
      return value;
    });
  }
}
