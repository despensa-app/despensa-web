import {Component, input} from '@angular/core';

/**
 * Bloque de contenido con etiqueta en mayúsculas (`.dsp-section`).
 */
@Component({
  selector: 'app-dsp-section',
  imports: [],
  templateUrl: './dsp-section.component.html',
  styleUrl: './dsp-section.component.css'
})
export class DspSectionComponent {

  title = input.required<string>();

  /** Contador o apostilla a la derecha del título (`.dsp-count`). */
  count = input<string>();

}
