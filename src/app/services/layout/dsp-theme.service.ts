import {DOCUMENT, computed, effect, inject, Injectable, signal} from '@angular/core';

/** Preferencia elegida por la persona. `auto` sigue al sistema operativo. */
export type DspThemePreference = 'light' | 'dark' | 'auto';

type ResolvedTheme = Exclude<DspThemePreference, 'auto'>;

/**
 * Tema claro/oscuro de la aplicación.
 *
 * También mantiene al día el `<meta name="theme-color">`, que tiñe el cromo del
 * navegador (barra de direcciones en Android, cabecera de la PWA, barra
 * superior de Safari).
 */
@Injectable({providedIn: 'root'})
export class DspThemeService {

  private static readonly THEME_KEY = 'dsp-theme';
  private static readonly DARK_QUERY = '(prefers-color-scheme: dark)';

  /**
   * Token `--dsp-*` del que sale el color del cromo en cada tema. Se lee del
   * CSS en lugar de repetir los hexadecimales: el `content` de un `<meta>` no
   * admite `var()`, así que era el único sitio donde los colores de marca
   * quedaban duplicados fuera de `despensa.css`.
   */
  private static readonly THEME_COLOR_TOKEN: Record<ResolvedTheme, string> = {
    light: '--dsp-primary',
    dark: '--dsp-bg'
  };

  private readonly document = inject(DOCUMENT);

  /** Referencia viva a la consulta del sistema; ver `watchSystem()`. */
  private darkQuery: MediaQueryList | null = null;

  private readonly preferred = signal<DspThemePreference>(this.readStored());

  /** Si el sistema operativo pide oscuro; solo importa con preferencia `auto`. */
  private readonly systemPrefersDark = signal(this.matchesDark());

  /** Preferencia elegida, sin resolver `auto`. */
  readonly preference = this.preferred.asReadonly();

  /** Tema que se pinta finalmente, una vez resuelta la preferencia automática. */
  readonly resolved = computed<ResolvedTheme>(() => {
    const preference = this.preferred();

    if (preference !== 'auto') {
      return preference;
    }

    return this.systemPrefersDark() ? 'dark' : 'light';
  });

  /** `true` cuando el tema finalmente aplicado es el oscuro. */
  readonly isDark = computed(() => this.resolved() === 'dark');

  constructor() {
    this.watchSystem();
    effect(() => this.applyToDocument(this.resolved()));
  }

  /**
   * Cambia la preferencia y la recuerda para la próxima visita.
   *
   * @param preference preferencia de tema que se debe aplicar
   */
  use(preference: DspThemePreference): void {
    this.preferred.set(preference);

    try {
      this.document.defaultView?.localStorage.setItem(DspThemeService.THEME_KEY, preference);
    } catch {
      // Sin almacenamiento el tema se pierde al recargar, pero sigue funcionando.
    }
  }

  private applyToDocument(theme: ResolvedTheme): void {
    const root = this.document.documentElement;

    root.setAttribute('data-bs-theme', theme);
    root.style.colorScheme = theme;
    this.paintThemeColor(theme);
  }

  private paintThemeColor(theme: ResolvedTheme): void {
    const meta = this.document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

    if (!meta) {
      return;
    }

    const color = this.document.defaultView
      ?.getComputedStyle(this.document.documentElement)
      .getPropertyValue(DspThemeService.THEME_COLOR_TOKEN[theme])
      .trim();

    if (color) {
      meta.content = color;
    }
  }

  /** Con `auto`, sigue al sistema aunque cambie con la aplicación abierta. */
  private watchSystem(): void {
    this.darkQuery = this.document.defaultView?.matchMedia?.(DspThemeService.DARK_QUERY) ?? null;
    this.darkQuery?.addEventListener('change', event => this.systemPrefersDark.set(event.matches));
  }

  private matchesDark(): boolean {
    return this.document.defaultView?.matchMedia?.(DspThemeService.DARK_QUERY).matches ?? false;
  }

  private readStored(): DspThemePreference {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(DspThemeService.THEME_KEY);

      return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
    } catch {
      return 'auto';
    }
  }
}
