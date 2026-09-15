/**
 * Mensaje efímero del snackbar con acción de deshacer (`.dsp-snackbar`).
 */
export interface DspSnackbarMessage {
  text: string;
  /** Texto del botón de acción; por defecto «Deshacer». */
  actionLabel?: string;
  /** Si se indica, se muestra el botón de acción. */
  action?: () => void;
}
