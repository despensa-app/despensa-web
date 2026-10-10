import {Component, input} from '@angular/core';

/**
 * Contenedor de filas de producto (`.dsp-list`).
 */
@Component({
  selector: 'app-dsp-list',
  imports: [],
  templateUrl: './dsp-list.component.html',
  styleUrl: './dsp-list.component.css'
})
export class DspListComponent {

  /**
   * Sin borde ni fondo, para apilar filas sobre el fondo de la pantalla.
   *
   * TODO: sin uso. `.dsp-list-flush` está definida en `despensa.css` pero no la
   * usa ninguna pantalla de `new-v2`, ni siquiera la guía. Eliminar si al
   * rehacer las pantallas sigue sin hacer falta.
   */
  flush = input<boolean>(false);

}
