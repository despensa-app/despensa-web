import {Component, computed, input} from '@angular/core';
import {DspIconButtonComponent} from '@app/shared/components/dsp-icon-button/dsp-icon-button.component';

/**
 * Hoja inferior (`.offcanvas.offcanvas-bottom.dsp-sheet`). La abre y la cierra
 * Bootstrap 5 mediante `data-bs-toggle="offcanvas"`, que ya se encarga del
 * fondo, del foco atrapado y del cierre con `Esc`.
 */
@Component({
  selector: 'app-dsp-sheet',
  imports: [
    DspIconButtonComponent
  ],
  templateUrl: './dsp-sheet.component.html',
  styleUrl: './dsp-sheet.component.css'
})
export class DspSheetComponent {

  /** Identificador al que apuntan los `data-bs-target` que la abren. */
  sheetId = input.required<string>();

  title = input.required<string>();

  /** Cuerpo con relleno, para hojas de texto en lugar de listas de opciones. */
  padded = input<boolean>(false);

  /** Renderiza el pie; sin esto un pie vacío dejaría un borde suelto. */
  withFooter = input<boolean>(false);

  titleId = computed(() => `${this.sheetId()}-title`);

}
