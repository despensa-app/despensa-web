import {Injectable, signal} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ToastMessageOptions} from 'primeng/api/toastmessage';
import {Toast} from 'primeng/toast';

@Injectable({
  providedIn: 'root'
})
export class MessagePrimeNgService {

  private toastComponent = signal<Toast | undefined>(undefined);

  constructor(private messageService: MessageService) {
  }

  setToastComponent(toastComponent: Toast | undefined) {
    this.toastComponent.set(toastComponent);
  }

  showSuccess(message: string) {
    this.show({
      id: 'success',
      severity: 'success',
      summary: 'Operación realizada',
      icon: 'fas fa-check text-lg',
      detail: message
    });
  }

  showInfo(message: string) {
    this.show({
      id: 'info',
      severity: 'info',
      summary: 'Información',
      icon: 'fas fa-info text-lg',
      detail: message
    });
  }

  showWarn(message: string) {
    this.show({
      id: 'warn',
      severity: 'warn',
      summary: 'Advertencia',
      icon: 'fas fa-exclamation text-lg',
      detail: message
    });
  }

  showError(message: string) {
    this.show({
      id: 'error',
      severity: 'error',
      summary: 'Error',
      icon: 'fas fa-times text-lg',
      detail: message
    });
  }

  private show(toastMessageOptions: ToastMessageOptions) {
    const messageAux: ToastMessageOptions = {
      ...toastMessageOptions,
      sticky: false,
      life: 5000
    };

    this.removePreviousMessage(messageAux);

    this.messageService.add(messageAux);
  }

  private removePreviousMessage(toastMessageOptions: ToastMessageOptions) {
    const messages: ToastMessageOptions[] | null | undefined = this.toastComponent()?.messages;
    const messagesSeverity = messages?.filter((message: ToastMessageOptions) => message.severity === toastMessageOptions.severity);
    const findIndex = messages?.findIndex((message: ToastMessageOptions) => message.id === toastMessageOptions.id);

    if (messagesSeverity != null && messagesSeverity.length >= 0 && findIndex != null && findIndex >= 0) {
      messages?.splice(findIndex, 1);
    }
  }

}
