import {Component, input} from '@angular/core';

/**
 * Estado vacío (`.dsp-empty`). Siempre propone la siguiente acción, que se
 * proyecta debajo del texto.
 */
@Component({
  selector: 'app-dsp-empty',
  imports: [],
  templateUrl: './dsp-empty.component.html',
  styleUrl: './dsp-empty.component.css'
})
export class DspEmptyComponent {

  title = input.required<string>();

  description = input<string>();

  /** Clase de Bootstrap Icons del círculo superior. */
  icon = input<string>('bi-basket2');

  /**
   * Versión compacta, para cuando el estado vive dentro de una tarjeta.
   *
   * TODO: solo lo usa la guía `dev/components`. Los estados vacíos de `new-v2`
   * ocupan la pantalla entera y llevan el relleno normal.
   */
  compact = input<boolean>(false);

}
