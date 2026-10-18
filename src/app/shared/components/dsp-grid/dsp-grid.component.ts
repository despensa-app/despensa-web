import {Component, input} from '@angular/core';

/**
 * Cuadrícula responsiva de productos con imagen (`.dsp-grid`).
 */
@Component({
  selector: 'app-dsp-grid',
  imports: [],
  templateUrl: './dsp-grid.component.html',
  styleUrl: './dsp-grid.component.css'
})
export class DspGridComponent {

  /** Ancho mínimo de columna; por defecto el de la maqueta. */
  minColumnWidth = input<string>('150px');

}
