import {Component, input} from '@angular/core';

/**
 * Fila de producto (`.dsp-row`).
 *
 * Excepción consciente a la convención de selectores del proyecto: usa
 * selector de atributo para que el consumidor elija la etiqueta. La maqueta
 * necesita `<label class="dsp-row">` cuando la fila entera marca la casilla, y
 * `<div>` o `<a>` en el resto de casos. Además, así el anfitrión *es* la fila:
 * `.dsp-row:last-child { border-bottom: 0 }` sigue funcionando dentro de
 * `.dsp-list`, cosa que no ocurriría con un componente envolvente.
 */
@Component({
  selector: 'label[app-dsp-row], div[app-dsp-row], a[app-dsp-row]',
  imports: [],
  host: {
    'class': 'dsp-row',
    '[class.is-checked]': 'checked()',
    '[class.dsp-row-lg]': 'large()'
  },
  templateUrl: './dsp-row.component.html',
  styleUrl: './dsp-row.component.css'
})
export class DspRowComponent {

  rowTitle = input<string>();

  rowMeta = input<string>();

  /** Importe alineado a la derecha, ya formateado. */
  price = input<string>();

  /** Producto marcado: tachado y atenuado. */
  checked = input<boolean>(false);

  /** Fila alta del modo compra (`.dsp-row-lg`). */
  large = input<boolean>(false);

}
