import {Component, computed, input} from '@angular/core';

/**
 * Muestra de color de la paleta: pinta el token `--dsp-*` que recibe y lo
 * etiqueta debajo.
 *
 * TODO: componente exclusivo de la guía `dev/components`. Ninguna pantalla de
 * `new-v2` pinta la paleta; si la guía desaparece, este componente sobra.
 */
@Component({
  selector: 'app-dsp-color-swatch',
  imports: [],
  templateUrl: './dsp-color-swatch.component.html',
  styleUrl: './dsp-color-swatch.component.css'
})
export class DspColorSwatchComponent {

  /** Nombre del token sin el prefijo, p. ej. `primary-soft`. */
  token = input.required<string>();

  /** Añade borde para los tokens de superficie, que si no no se ven. */
  bordered = input<boolean>(false);

  background = computed(() => `var(--dsp-${this.token()})`);

}
