import {Component, computed, input} from '@angular/core';

/**
 * Etiqueta suave reutilizable (`.dsp-tag`).
 */
@Component({
  selector: 'app-dsp-tag',
  imports: [],
  templateUrl: './dsp-tag.component.html',
  styleUrl: './dsp-tag.component.css'
})
export class DspTagComponent {

  variant = input<'neutral' | 'primary' | 'accent' | 'danger' | 'info'>('neutral');

  /** Clase de Bootstrap Icons a la izquierda del texto. */
  icon = input<string>();

  classes = computed(() => this.variant() === 'neutral' ? 'dsp-tag' : `dsp-tag dsp-tag-${this.variant()}`);

}
