import {Component, input} from '@angular/core';

/**
 * Barra superior fija de la pantalla (`.dsp-appbar`). Proyecta los botones de
 * los extremos con los atributos `dspStart` y `dspEnd`.
 */
@Component({
  selector: 'app-dsp-appbar',
  imports: [],
  templateUrl: './dsp-appbar.component.html',
  styleUrl: './dsp-appbar.component.css'
})
export class DspAppbarComponent {

  title = input.required<string>();

  subtitle = input<string>();

  /** `h1` en las pantallas donde la app bar es el único titular. */
  titleTag = input<'h1' | 'span'>('h1');

  /** Tipografía mayor para la pantalla de inicio (`.dsp-appbar-brand`). */
  brand = input<boolean>(false);

  /**
   * Desactiva `position: sticky` para incrustar la barra dentro de una tarjeta.
   *
   * TODO: solo lo usa la guía `dev/components`, para enseñar la barra dentro de
   * una tarjeta. En una pantalla real la app bar siempre es sticky.
   */
  embedded = input<boolean>(false);

}
