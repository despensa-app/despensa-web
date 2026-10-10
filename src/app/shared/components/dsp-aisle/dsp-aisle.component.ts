import {Component, computed, input} from '@angular/core';
import {DspTagComponent} from '@app/shared/components/dsp-tag/dsp-tag.component';

/**
 * Grupo de productos por pasillo, plegable (`.dsp-aisle`). El plegado lo mueve
 * el `collapse` de Bootstrap 5 mediante `data-bs-*`, así que `expanded` solo se
 * lee en el primer render: a partir de ahí manda el vendor.
 */
@Component({
  selector: 'app-dsp-aisle',
  imports: [
    DspTagComponent
  ],
  templateUrl: './dsp-aisle.component.html',
  styleUrl: './dsp-aisle.component.css'
})
export class DspAisleComponent {

  /** Identificador único en la página; genera el id del bloque plegable. */
  aisleId = input.required<string>();

  name = input.required<string>();

  /** Clase de Bootstrap Icons, p. ej. `bi-basket2`. */
  icon = input<string>('bi-basket2');

  /** Contador del pasillo, p. ej. `1/3`. */
  count = input<string>();

  expanded = input<boolean>(true);

  collapseId = computed(() => `${this.aisleId()}-collapse`);

}
