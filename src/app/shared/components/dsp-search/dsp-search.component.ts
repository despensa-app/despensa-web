import {Component, EventEmitter, input, Output, signal} from '@angular/core';

/**
 * Buscador redondeado con botón de limpiar (`.dsp-search`).
 */
@Component({
  selector: 'app-dsp-search',
  imports: [],
  templateUrl: './dsp-search.component.html',
  styleUrl: './dsp-search.component.css'
})
export class DspSearchComponent {

  /** Contador para generar ids únicos de `<label for>`. */
  private static nextId = 0;

  placeholder = input<string>('Buscar');

  /** Texto de la etiqueta oculta asociada al campo. */
  label = input<string>('Buscar');

  /** Quita el margen inferior cuando el buscador ya va dentro de un bloque. */
  flush = input<boolean>(false);

  @Output() valueChange = new EventEmitter<string>();

  value = signal<string>('');

  readonly inputId = `dsp-search-${DspSearchComponent.nextId++}`;

  /**
   * Propaga el texto tecleado.
   *
   * @param event evento `input` del campo de búsqueda
   */
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.valueChange.emit(input.value);
  }

  /**
   * Vacía el campo y avisa a quien escucha.
   */
  clear(): void {
    this.value.set('');
    this.valueChange.emit('');
  }

}
