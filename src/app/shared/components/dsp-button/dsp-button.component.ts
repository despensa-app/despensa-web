import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Botón del rediseño. Compone las clases de Bootstrap 5 y las dos variantes
 * «suaves» compartidas que define `despensa.css` (`.btn-soft`,
 * `.btn-soft-danger`).
 */
@Component({
  selector: 'app-dsp-button',
  imports: [RouterLink],
  templateUrl: './dsp-button.component.html',
  styleUrl: './dsp-button.component.css'
})
export class DspButtonComponent {

  variant = input<'primary' | 'outline-primary' | 'soft' | 'outline-secondary' | 'soft-danger'>('primary');

  size = input<'sm' | 'md'>('md');

  /** Botón de acción principal a ancho completo (`.dsp-btn-block-lg`). */
  block = input<boolean>(false);

  disabled = input<boolean>(false);

  type = input<'button' | 'submit'>('button');

  /** Clase de Bootstrap Icons a la izquierda del texto. */
  icon = input<string>();

  /** Si está definido renderiza un enlace con aspecto de botón. */
  path = input<string>();

  @Output() action = new EventEmitter<void>();

  classes = computed(() => {
    const classes = ['btn', `btn-${this.variant()}`];
    if (this.size() === 'sm') {
      classes.push('btn-sm');
    }
    if (this.block()) {
      classes.push('dsp-btn-block-lg');
    }
    return classes.join(' ');
  });

}
