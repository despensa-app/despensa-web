import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Tarjeta de superficie del rediseño (`.dsp-card`). Se renderiza como enlace
 * cuando recibe `path`, que es lo que activa el realce al pasar por encima.
 */
@Component({
  selector: 'app-dsp-card',
  imports: [
    RouterLink
  ],
  templateUrl: './dsp-card.component.html',
  styleUrl: './dsp-card.component.css'
})
export class DspCardComponent {

  /** Ruta de Angular; si se indica, la tarjeta se renderiza como `<a>`. */
  path = input<string>();

  /** Aspecto atenuado de una lista ya cerrada (`.is-closed`). */
  closed = input<boolean>(false);

  /**
   * Quita el relleno para incrustar contenido a sangre.
   *
   * TODO: solo lo usa la guía `dev/components` (barra de navegación y tabla de
   * equivalencias). Ninguna tarjeta de `new-v2` va sin relleno.
   */
  flush = input<boolean>(false);

}
