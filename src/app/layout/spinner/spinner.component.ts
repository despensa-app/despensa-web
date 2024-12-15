import {Component, computed} from '@angular/core';
import {ProgressSpinner} from 'primeng/progressspinner';
import {SpinnerService} from '@app/services/layout/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [
    ProgressSpinner
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  show = computed(() => this.spinnerService.getSpinner());

  constructor(private spinnerService: SpinnerService) {
  }

}
