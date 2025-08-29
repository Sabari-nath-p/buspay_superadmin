import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { AlertConfirmComponent } from './alert-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class AlertConfirmService {
  constructor(
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {}

  confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const componentRef: ComponentRef<AlertConfirmComponent> = createComponent(
        AlertConfirmComponent,
        {
          environmentInjector: this.injector,
        }
      );

      componentRef.instance.title = title;
      componentRef.instance.message = message;
      componentRef.instance.btnOkText = btnOkText;
      componentRef.instance.btnCancelText = btnCancelText;

      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild(componentRef.location.nativeElement);

      setTimeout(() => {
        componentRef.location.nativeElement.classList.add('show', 'd-block');
      }, 10);

      // Handle result when user clicks a button
      componentRef.instance.result.subscribe((confirmed: boolean) => {
        resolve(confirmed);
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy(); // Cleanup
      });
    });
  }
}
