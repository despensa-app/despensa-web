import {Component, input} from '@angular/core';

/**
 * Bloque de carga con brillo (`.dsp-skeleton`). En variante `line` sirve de
 * renglón de texto; en la normal, de miniatura.
 *
 * TODO: hoy solo se usa en la guía `dev/components`. Ninguna pantalla de
 * `new-v2` tiene estado de carga todavía; al construirlas hay que decidir si se
 * adopta de verdad o se elimina.
 */
@Component({
  selector: 'app-dsp-skeleton',
  imports: [],
  templateUrl: './dsp-skeleton.component.html',
  styleUrl: './dsp-skeleton.component.css'
})
export class DspSkeletonComponent {

  /** Renglón de texto en lugar de bloque (`.dsp-skeleton-line`). */
  line = input<boolean>(false);

  width = input<string>('100%');

  /** Alto en CSS; se ignora en la variante `line`, que ya trae el suyo. */
  height = input<string>();

  radius = input<string>();

  /** Quita el margen inferior del último renglón de un grupo. */
  last = input<boolean>(false);

}
