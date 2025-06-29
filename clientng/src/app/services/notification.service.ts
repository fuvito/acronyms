import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new Subject<Notification>();
  notification$ = this.notificationSource.asObservable();

  constructor() {}

  /**
   * Show a success notification
   */
  success(message: string, duration = 3000): void {
    this.notify({
      message,
      type: 'success',
      duration
    });
  }

  /**
   * Show an error notification
   */
  error(message: string, duration = 5000): void {
    this.notify({
      message,
      type: 'error',
      duration
    });
  }

  /**
   * Show an info notification
   */
  info(message: string, duration = 3000): void {
    this.notify({
      message,
      type: 'info',
      duration
    });
  }

  private notify(notification: Notification): void {
    this.notificationSource.next(notification);
  }
}
