import {Component, EventEmitter, input, Output} from '@angular/core';
import {DspChip} from '@app/shared/models/dsp-chip.model';

/**
 * Tira horizontal de chips de filtro (`.dsp-chips`).
 */
@Component({
  selector: 'app-dsp-chips',
  imports: [],
  templateUrl: './dsp-chips.component.html',
  styleUrl: './dsp-chips.component.css'
})
export class DspChipsComponent {

  chips = input.required<DspChip[]>();

  /** Etiqueta del `role="group"`; es obligatoria por accesibilidad. */
  label = input.required<string>();

  /**
   * Quita los márgenes negativos para usarla dentro de una tarjeta.
   *
   * TODO: solo lo usa la guía `dev/components`. En las pantallas la tira de
   * chips sangra a propósito hasta los bordes para poder desplazarla.
   */
  inset = input<boolean>(false);

  @Output() chipSelect = new EventEmitter<DspChip>();

}
