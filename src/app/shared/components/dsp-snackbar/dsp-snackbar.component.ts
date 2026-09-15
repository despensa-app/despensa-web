import {Component, computed, inject} from '@angular/core';
import {DspSnackbarService} from '@app/services/layout/dsp-snackbar.service';

/**
 * Anfitrión del snackbar (`.dsp-snackbar`). Se coloca una sola vez por
 * aplicación y muestra lo que le pase `DspSnackbarService`.
 */
@Component({
  selector: 'app-dsp-snackbar',
  imports: [],
  templateUrl: './dsp-snackbar.component.html',
  styleUrl: './dsp-snackbar.component.css'
})
export class DspSnackbarComponent {

  private readonly snackbarService = inject(DspSnackbarService);

  message = computed(() => this.snackbarService.message());

  visible = computed(() => this.message() !== null);

  /**
   * Ejecuta la acción de deshacer y cierra el snackbar.
   */
  runAction(): void {
    this.message()?.action?.();
    this.snackbarService.hide();
  }

}
