import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: '',  // Empty template as we're using Material's snackbar instead
  styles: ''
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notification$.subscribe(notification => {
      this.showSnackBar(notification);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showSnackBar(notification: Notification): void {
    const panelClass = ['snackbar', notification.type];

    this.snackBar.open(notification.message, 'Close', {
      duration: notification.duration || 3000,
      panelClass,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
