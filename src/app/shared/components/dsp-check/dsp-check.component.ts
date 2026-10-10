import {Component, EventEmitter, input, Output} from '@angular/core';

/**
 * Casilla grande de marcar producto (`.dsp-check`). Dentro de un
 * `<label app-dsp-row>` la fila entera queda asociada a la casilla.
 */
@Component({
  selector: 'app-dsp-check',
  imports: [],
  templateUrl: './dsp-check.component.html',
  styleUrl: './dsp-check.component.css'
})
export class DspCheckComponent {

  checked = input<boolean>(false);

  /** Texto para lector de pantalla cuando la fila no lleva etiqueta propia. */
  label = input<string>();

  @Output() checkedChange = new EventEmitter<boolean>();

  /**
   * Propaga el nuevo estado de la casilla.
   *
   * @param event evento `change` del input nativo
   */
  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checkedChange.emit(input.checked);
  }

}
