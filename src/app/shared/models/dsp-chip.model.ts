/**
 * Chip de filtro del rediseño (`.dsp-chip`).
 */
export interface DspChip {
  id: string;
  label: string;
  /** Clase de Bootstrap Icons, p. ej. `bi-basket2`. TODO: permitir mas tipos de iconos, no solo los de bootstrap. */
  icon?: string;
  active?: boolean;
}
