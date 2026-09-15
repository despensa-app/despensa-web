import {Component, EventEmitter, input, Output} from '@angular/core';

/**
 * Celda de la cuadrícula de productos con imagen (`.dsp-tile`).
 */
@Component({
  selector: 'app-dsp-tile',
  imports: [],
  templateUrl: './dsp-tile.component.html',
  styleUrl: './dsp-tile.component.css'
})
export class DspTileComponent {

  tileTitle = input.required<string>();

  tileMeta = input<string>();

  /** Clase de Bootstrap Icons usada cuando no hay imagen. */
  icon = input<string>('bi-box-seam');

  imageUrl = input<string>();

  imageAlt = input<string>('');

  /** Clase de Bootstrap Icons del botón de la esquina; si falta, no se pinta. */
  actionIcon = input<string>();

  actionLabel = input<string>('Añadir');

  @Output() action = new EventEmitter<void>();

}
