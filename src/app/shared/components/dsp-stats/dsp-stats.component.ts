import {Component, input} from '@angular/core';
import {DspStat} from '@app/shared/models/dsp-stat.model';

/**
 * Rejilla de métricas de cabecera (`.dsp-stats`).
 */
@Component({
  selector: 'app-dsp-stats',
  imports: [],
  templateUrl: './dsp-stats.component.html',
  styleUrl: './dsp-stats.component.css'
})
export class DspStatsComponent {

  stats = input.required<DspStat[]>();

}
