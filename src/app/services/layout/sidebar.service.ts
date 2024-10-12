import {Injectable, signal} from '@angular/core';
import {DataSidebar} from '../../models/data-sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private elements = signal<DataSidebar[]>([]);


  showLoginAndHideLogout() {
    this.elements.update(value => {
      value.forEach(element => {
        if (element.id === 'login') {
          element.hide = false;
        }
        if (element.id === 'logout') {
          element.hide = true;
        }
      });
      return value;
    });
  }

  showLogoutAndHideLogin() {
    this.elements.update(value => {
      value.forEach(element => {
        if (element.id === 'logout') {
          element.hide = false;
        }
        if (element.id === 'login') {
          element.hide = true;
        }
      });
      return value;
    });
  }

  setElements(elements: DataSidebar[]) {
    this.elements.set(elements);
  }

  getElements() {
    return this.elements();
  }

}
