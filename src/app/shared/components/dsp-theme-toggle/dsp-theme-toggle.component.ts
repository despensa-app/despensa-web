import {Component, inject} from '@angular/core';
import {
  DspThemePreference,
  DspThemeService
} from '@app/services/layout/dsp-theme.service';

/**
 * Selector independiente de la preferencia de tema de la aplicación.
 */
@Component({
  selector: 'app-dsp-theme-toggle',
  imports: [],
  templateUrl: './dsp-theme-toggle.component.html',
  styleUrl: './dsp-theme-toggle.component.css',
  host: {class: 'dropdown'}
})
export class DspThemeToggleComponent {

  private readonly themeService = inject(DspThemeService);

  /** Preferencia elegida; permite distinguir `auto` del tema resuelto. */
  protected readonly preference = this.themeService.preference;

  /** Cambia la preferencia de tema. */
  protected useTheme(preference: DspThemePreference): void {
    this.themeService.use(preference);
  }
}
