import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Botón circular de icono de la app bar y de las cabeceras de hoja
 * (`.dsp-appbar-btn`). Se renderiza como enlace cuando recibe `path`.
 */
@Component({
  selector: 'app-dsp-icon-button',
  imports: [
    RouterLink
  ],
  templateUrl: './dsp-icon-button.component.html',
  styleUrl: './dsp-icon-button.component.css'
})
export class DspIconButtonComponent {

  /** Clase de Bootstrap Icons, p. ej. `bi-arrow-left`. */
  icon = input.required<string>();

  /** Texto para lectores de pantalla: el botón no tiene etiqueta visible. */
  label = input.required<string>();

  /** Ruta de Angular; si se indica, el botón se renderiza como `<a>`. */
  path = input<string>();

  /** Cierra la hoja inferior que lo contiene (`data-bs-dismiss="offcanvas"`). */
  dismissSheet = input<boolean>(false);

  @Output() action = new EventEmitter<void>();

}
