import {Component, input} from '@angular/core';

/**
 * Miniatura cuadrada de producto o de lista (`.dsp-thumb`). Enseña la imagen
 * si la hay y, si no, un icono sobre el verde suave de marca.
 */
@Component({
  selector: 'app-dsp-thumb',
  imports: [],
  templateUrl: './dsp-thumb.component.html',
  styleUrl: './dsp-thumb.component.css'
})
export class DspThumbComponent {

  /** Clase de Bootstrap Icons usada cuando no hay imagen. */
  icon = input<string>('bi-box-seam');

  imageUrl = input<string>();

  imageAlt = input<string>('');

  size = input<'sm' | 'md' | 'lg'>('md');

}
