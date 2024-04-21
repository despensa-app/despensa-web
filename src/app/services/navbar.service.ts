import {Injectable, signal} from '@angular/core';
import {DataNavbar} from '../models/data-navbar';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private elements = signal<DataNavbar[]>([]);

  constructor() {
  }

  setElements(elements: DataNavbar[]) {
    this.elements.set(elements);
  }

  getElements() {
    return this.elements();
  }
}
