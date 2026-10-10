import {Component, EventEmitter, input, linkedSignal, Output, signal} from '@angular/core';

/**
 * Selector de unidades por producto (`.dsp-stepper`). Sustituye al contrato
 * `data-dsp-stepper` de la maqueta, que no alcanza al DOM de Angular.
 */
@Component({
  selector: 'app-dsp-stepper',
  imports: [],
  templateUrl: './dsp-stepper.component.html',
  styleUrl: './dsp-stepper.component.css'
})
export class DspStepperComponent {

  value = input<number>(1);

  min = input<number>(1);

  @Output() valueChange = new EventEmitter<number>();

  /** Valor mostrado: parte del input y se actualiza al pulsar. */
  current = linkedSignal(() => this.value());

  /** Activa la animación de latido al cambiar el valor. */
  pulse = signal<boolean>(false);

  /**
   * Suma o resta una unidad respetando el mínimo.
   *
   * @param step incremento a aplicar, `1` o `-1`
   */
  step(step: number): void {
    const next = Math.max(this.min(), this.current() + step);
    this.current.set(next);
    this.valueChange.emit(next);
    this.triggerPulse();
  }

  private triggerPulse(): void {
    this.pulse.set(false);
    setTimeout(() => this.pulse.set(true));
    setTimeout(() => this.pulse.set(false), 500);
  }

}
