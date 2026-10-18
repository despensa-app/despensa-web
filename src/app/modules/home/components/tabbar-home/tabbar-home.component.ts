import {Component} from '@angular/core';
import {DspTab} from '@app/shared/models/dsp-tab.model';
import {DspOptionComponent} from '@app/shared/components/dsp-option/dsp-option.component';
import {DspSheetComponent} from '@app/shared/components/dsp-sheet/dsp-sheet.component';
import {DspTabbarComponent} from '@app/shared/components/dsp-tabbar/dsp-tabbar.component';

@Component({
  selector: 'app-tabbar-home',
  imports: [
    DspOptionComponent,
    DspSheetComponent,
    DspTabbarComponent
  ],
  templateUrl: './tabbar-home.component.html',
  styleUrl: './tabbar-home.component.css'
})
export class TabbarHomeComponent {

  readonly tabs: DspTab[] = [
    {
      id: 'lists',
      label: 'Listas',
      icon: 'bi-list-ul',
      path: '/',
      active: true
    },
    {
      id: 'login',
      label: 'Iniciar sesión',
      icon: 'bi-person',
      path: '/auth/login'
    }
  ];

  openSheet(id: string): void {
    const element = document.getElementById(id);
    const bootstrap = (window as Window & {
      bootstrap?: {
        Offcanvas: {
          getOrCreateInstance: (element: Element) => { show: () => void }
        }
      }
    }).bootstrap;
    if (element && bootstrap) {
      bootstrap.Offcanvas.getOrCreateInstance(element)
               .show();
    }
  }

}
