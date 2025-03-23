import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private defaultOptions = {
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  };

  constructor(private toastr: ToastrService) {}

  /**
   * Show success toast message
   * @param message Main message to display
   * @param title Optional title
   * @param options Optional toast configuration options
   */
  success(message: string, title: string = 'Success', options: any = {}): void {
    this.toastr.success(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show error toast message
   * @param message Main message to display
   * @param title Optional title
   * @param options Optional toast configuration options
   */
  error(message: string, title: string = 'Error', options: any = {}): void {
    this.toastr.error(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show info toast message
   * @param message Main message to display
   * @param title Optional title
   * @param options Optional toast configuration options
   */
  info(message: string, title: string = 'Info', options: any = {}): void {
    this.toastr.info(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show warning toast message
   * @param message Main message to display
   * @param title Optional title
   * @param options Optional toast configuration options
   */
  warning(message: string, title: string = 'Warning', options: any = {}): void {
    this.toastr.warning(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show a generic toast with custom type
   * @param type Toast type from ToastType enum
   * @param message Main message to display
   * @param title Optional title
   * @param options Optional toast configuration options
   */
  showToast(
    type: ToastType,
    message: string,
    title: string = '',
    options: any = {}
  ): void {
    switch (type) {
      case ToastType.SUCCESS:
        this.success(message, title, options);
        break;
      case ToastType.ERROR:
        this.error(message, title, options);
        break;
      case ToastType.INFO:
        this.info(message, title, options);
        break;
      case ToastType.WARNING:
        this.warning(message, title, options);
        break;
      default:
        this.info(message, title, options);
    }
  }

  /**
   * Clear all toasts
   */
  clearAll(): void {
    this.toastr.clear();
  }
}
