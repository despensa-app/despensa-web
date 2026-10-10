import {Component, input} from '@angular/core';

/**
 * Barra fija para las acciones principales de una pantalla.
 */
@Component({
  selector: 'app-dsp-actionbar',
  imports: [],
  templateUrl: './dsp-actionbar.component.html',
  styleUrl: './dsp-actionbar.component.css'
})
export class DspActionbarComponent {

  /** Usar cuando la pantalla no muestra tab bar. */
  bottom = input<boolean>(false);

}
