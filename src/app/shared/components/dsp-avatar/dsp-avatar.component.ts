import {Component, input} from '@angular/core';

/**
 * Miniatura de una persona cuando solo se conocen sus iniciales.
 */
@Component({
  selector: 'app-dsp-avatar',
  imports: [],
  templateUrl: './dsp-avatar.component.html',
  styleUrl: './dsp-avatar.component.css'
})
export class DspAvatarComponent {

  initials = input.required<string>();

  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  tone = input<'primary' | 'info'>('primary');

}
