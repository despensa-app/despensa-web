/**
 * Barra del mini gráfico de historial (`.dsp-chart-col`).
 */
export interface DspChartBar {
  label: string;
  /** Altura de la barra en porcentaje (0-100). */
  value: number;
  highlight?: boolean;
}
