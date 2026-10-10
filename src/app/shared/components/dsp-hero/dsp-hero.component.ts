import {Component, input} from '@angular/core';

/**
 * Cabecera grande de sección bajo la app bar (`.dsp-hero`). El cuerpo se
 * proyecta para poder mezclar texto corrido y elementos en línea.
 */
@Component({
  selector: 'app-dsp-hero',
  imports: [],
  templateUrl: './dsp-hero.component.html',
  styleUrl: './dsp-hero.component.css'
})
export class DspHeroComponent {

  title = input.required<string>();

  /** `h2` cuando el `<h1>` de la pantalla ya lo ocupa la app bar. */
  titleTag = input<'h1' | 'h2'>('h2');

}
