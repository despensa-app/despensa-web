import {Component, computed, EventEmitter, input, Output, signal} from '@angular/core';

/**
 * Fila deslizable que revela la acción de eliminar (`.dsp-swipe`). El
 * anfitrión *es* el contenedor para que `.dsp-swipe:last-child` siga
 * funcionando dentro de una `.dsp-list`.
 */
@Component({
  selector: 'app-dsp-swipe',
  imports: [],
  host: {
    'class': 'dsp-swipe',
    '[class.is-open]': 'open()'
  },
  templateUrl: './dsp-swipe.component.html',
  styleUrl: './dsp-swipe.component.css'
})
export class DspSwipeComponent {

  /** Ancho revelado al deslizar, en píxeles (igual que `.dsp-swipe-actions`). */
  private static readonly REVEAL_PX = 76;

  /** A partir de este arrastre la fila se queda abierta. */
  private static readonly OPEN_THRESHOLD_PX = 30;

  removeLabel = input<string>('Eliminar');

  @Output() remove = new EventEmitter<void>();

  open = signal<boolean>(false);

  /** Desplazamiento en curso; `null` cuando manda la clase `.is-open`. */
  offset = signal<number | null>(null);

  transform = computed(() => {
    const offset = this.offset();
    return offset === null ? null : `translateX(${offset}px)`;
  });

  private startX = 0;

  private dragging = false;

  /**
   * Empieza a seguir el dedo o el puntero.
   *
   * @param event evento `pointerdown` sobre el contenido de la fila
   */
  onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
    this.dragging = true;
    this.offset.set(0);
  }

  /**
   * Arrastra el contenido hacia la izquierda, con tope en el ancho revelado.
   *
   * @param event evento `pointermove` sobre el contenido de la fila
   */
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    const delta = Math.min(0, Math.max(-DspSwipeComponent.REVEAL_PX, event.clientX - this.startX));
    this.offset.set(delta);
  }

  /**
   * Suelta la fila y decide si se queda abierta.
   *
   * @param event evento `pointerup`, `pointercancel` o `pointerleave`
   */
  onPointerEnd(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.offset.set(null);
    this.open.set((event.clientX - this.startX) < -DspSwipeComponent.OPEN_THRESHOLD_PX);
  }

}
