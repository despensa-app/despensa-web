import {Injectable, signal} from '@angular/core';
import {DataSidebar} from '../models/data-sidebar';

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
}
