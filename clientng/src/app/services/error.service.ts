import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService) {}

  /**
   * Handle HTTP errors and display appropriate notifications
   */
  handleError(error: HttpErrorResponse, operation: string): void {
    let errorMessage = `Failed to ${operation}`;

    if (error.status === 0) {
      errorMessage = 'Server is not responding. Please check your connection.';
    } else if (error.status === 404) {
      errorMessage = `Resource not found. ${operation} failed.`;
    } else if (error.status === 400) {
      errorMessage = `Bad request. Please check your input and try again.`;
    } else if (error.status === 401) {
      errorMessage = 'You are not authorized to perform this action.';
    } else if (error.status === 403) {
      errorMessage = 'Access forbidden. You don\'t have permission for this action.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }

    // Add error details if available
    if (error.error && error.error.message) {
      errorMessage += ` Details: ${error.error.message}`;
    }

    this.notificationService.error(errorMessage);
    console.error(`${operation} failed:`, error);
  }
}
