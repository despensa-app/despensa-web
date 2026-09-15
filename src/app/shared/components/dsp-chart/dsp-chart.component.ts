import {Component, input} from '@angular/core';
import {DspChartBar} from '@app/shared/models/dsp-chart-bar.model';

/**
 * Mini gráfico de barras del historial de compras (`.dsp-chart`). Es
 * decorativo: la descripción para lector de pantalla llega por `label`.
 */
@Component({
  selector: 'app-dsp-chart',
  imports: [],
  templateUrl: './dsp-chart.component.html',
  styleUrl: './dsp-chart.component.css'
})
export class DspChartComponent {

  bars = input.required<DspChartBar[]>();

  /** Descripción completa del gráfico para lectores de pantalla. */
  label = input.required<string>();

}
