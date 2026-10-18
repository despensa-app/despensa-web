import {Injectable, signal} from '@angular/core';
import {DspSnackbarMessage} from '@app/shared/models/dsp-snackbar-message.model';

/**
 * Cola de un solo hueco para el snackbar.
 */
@Injectable({providedIn: 'root'})
export class DspSnackbarService {

  private static readonly VISIBLE_MS = 5000;

  private readonly _message = signal<DspSnackbarMessage | null>(null);

  private timeout?: ReturnType<typeof setTimeout>;

  /** Mensaje visible, o `null` si el snackbar está oculto. */
  readonly message = this._message.asReadonly();

  /**
   * Muestra un mensaje durante cinco segundos.
   *
   * @param message texto y acción opcional de deshacer
   */
  show(message: DspSnackbarMessage): void {
    clearTimeout(this.timeout);
    this._message.set(message);
    this.timeout = setTimeout(() => this.hide(), DspSnackbarService.VISIBLE_MS);
  }

  /**
   * Oculta el snackbar inmediatamente.
   */
  hide(): void {
    clearTimeout(this.timeout);
    this._message.set(null);
  }

}
