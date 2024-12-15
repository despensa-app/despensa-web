import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner = signal<boolean>(false);

  private timeout: any;

  constructor() {
  }

  show() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.spinner.set(true);
    }, 500);
  }

  hide() {
    clearTimeout(this.timeout);
    this.spinner.set(false);
  }

  getSpinner() {
    return this.spinner();
  }

}
