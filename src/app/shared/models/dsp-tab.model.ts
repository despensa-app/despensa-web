/**
 * Destino de la barra inferior de navegación (`.dsp-tab`).
 */
export interface DspTab {
  id: string;
  label: string;
  /** Clase de Bootstrap Icons, p. ej. `bi-list-ul`. TODO: permitir mas tipos de iconos, no solo los de bootstrap.*/
  icon: string;
  /** Ruta de Angular; si no se indica el tab se renderiza como botón. */
  path?: string;
  active?: boolean;
}
