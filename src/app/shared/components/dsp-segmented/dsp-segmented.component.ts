import {Component, EventEmitter, input, Output} from '@angular/core';
import {DspSegment} from '@app/shared/models/dsp-segment.model';

/**
 * Control segmentado de selección única (`.dsp-segmented`).
 */
@Component({
  selector: 'app-dsp-segmented',
  imports: [],
  templateUrl: './dsp-segmented.component.html',
  styleUrl: './dsp-segmented.component.css'
})
export class DspSegmentedComponent {

  segments = input.required<DspSegment[]>();

  /** Etiqueta del `role="group"`; es obligatoria por accesibilidad. */
  label = input.required<string>();

  @Output() segmentSelect = new EventEmitter<DspSegment>();

}
