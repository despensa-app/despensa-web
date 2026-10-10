import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DspTab} from '@app/shared/models/dsp-tab.model';

/**
 * Barra inferior de navegación con botón de acción flotante en el centro
 * (`.dsp-tabbar` + `.dsp-fab`). El FAB se intercala a mitad de la lista de
 * destinos, igual que en la maqueta.
 */
@Component({
  selector: 'app-dsp-tabbar',
  imports: [
    RouterLink
  ],
  templateUrl: './dsp-tabbar.component.html',
  styleUrl: './dsp-tabbar.component.css'
})
export class DspTabbarComponent {

  tabs = input.required<DspTab[]>();

  /** Clase de Bootstrap Icons del FAB; si falta, no se renderiza el FAB. */
  fabIcon = input<string>();

  fabLabel = input<string>('Nueva lista');

  /**
   * Desactiva `position: fixed` para incrustar la barra dentro de una tarjeta.
   *
   * TODO: solo lo usa la guía `dev/components`. En una pantalla real la tab bar
   * siempre va fija abajo.
   */
  embedded = input<boolean>(false);

  /**
   * TODO: solo lo emite la guía `dev/components`, donde los tabs no navegan. En
   * `new-v2` todos los destinos son enlaces, así que las pantallas reales pasan
   * `path` y este `@Output` nunca se dispara.
   */
  @Output() tabSelect = new EventEmitter<DspTab>();

  @Output() fabAction = new EventEmitter<void>();

  /** Posición en la que se intercala el FAB. */
  fabIndex = computed(() => Math.ceil(this.tabs().length / 2));

  /** `true` cuando el FAB no cabe dentro del bucle y va al final. */
  fabAtEnd = computed(() => this.fabIndex() >= this.tabs().length);

}
