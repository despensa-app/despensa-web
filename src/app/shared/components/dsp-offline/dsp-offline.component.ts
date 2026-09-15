import {Component, input} from '@angular/core';

/**
 * Aviso de trabajo sin conexión (`.dsp-offline`).
 */
@Component({
  selector: 'app-dsp-offline',
  imports: [],
  templateUrl: './dsp-offline.component.html',
  styleUrl: './dsp-offline.component.css'
})
export class DspOfflineComponent {

  message = input.required<string>();

  /**
   * Esquinas redondeadas para usarlo suelto y no pegado a la app bar.
   *
   * TODO: solo lo usa la guía `dev/components`. En `shopping-mode.html`, la
   * única pantalla con este aviso, la banda va a sangre bajo la app bar.
   */
  rounded = input<boolean>(false);

}
