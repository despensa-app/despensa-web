import {Component, input} from '@angular/core';

/**
 * Barra de progreso de productos marcados (`.dsp-progress`).
 */
@Component({
  selector: 'app-dsp-progress',
  imports: [],
  templateUrl: './dsp-progress.component.html',
  styleUrl: './dsp-progress.component.css'
})
export class DspProgressComponent {

  /** Porcentaje completado, de 0 a 100. */
  value = input.required<number>();

  /** Etiqueta del `role="progressbar"`; es obligatoria por accesibilidad. */
  label = input.required<string>();

  /** Texto descriptivo sobre la barra, p. ej. «12 de 31 marcados». */
  caption = input<string>();

  /** Pinta la barra en ámbar en lugar de en verde (`.is-accent`). */
  accent = input<boolean>(false);

}
