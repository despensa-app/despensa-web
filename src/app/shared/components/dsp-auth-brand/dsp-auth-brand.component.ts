import {Component, input} from '@angular/core';

/**
 * Cabecera con el logotipo y la presentación de las pantallas de acceso.
 */
@Component({
  selector: 'app-dsp-auth-brand',
  imports: [],
  templateUrl: './dsp-auth-brand.component.html',
  styleUrl: './dsp-auth-brand.component.css'
})
export class DspAuthBrandComponent {

  title = input.required<string>();

  description = input.required<string>();

}
