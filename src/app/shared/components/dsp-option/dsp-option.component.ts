import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Opción dentro de una hoja inferior (`.dsp-option`).
 */
@Component({
  selector: 'app-dsp-option',
  imports: [RouterLink],
  templateUrl: './dsp-option.component.html',
  styleUrl: './dsp-option.component.css'
})
export class DspOptionComponent {

  text = input.required<string>();

  /** Subtexto que explica la consecuencia de la opción. */
  description = input<string>();

  /** Clase de Bootstrap Icons a la izquierda. */
  icon = input<string>('bi-dot');

  /** Si está definido renderiza un enlace con aspecto de botón. */
  path = input<string>();

  /** Opción marcada como elegida (`.is-selected`). */
  selected = input<boolean>(false);

  /** Opción destructiva, en rojo (`.is-danger`). */
  danger = input<boolean>(false);

  /** Cierra la hoja al pulsar (`data-bs-dismiss="offcanvas"`). */
  dismissSheet = input<boolean>(false);

  @Output() action = new EventEmitter<void>();

}
