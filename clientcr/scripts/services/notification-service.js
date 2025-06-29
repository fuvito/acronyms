/**
 * Service for displaying notifications in the popup
 */
export class NotificationService {
  constructor() {
    this.notificationElement = document.getElementById('notification');
    this.notificationMessage = document.querySelector('.notification-message');
    this.closeButton = document.querySelector('.close-notification');

    // Setup close button listener
    this.closeButton.addEventListener('click', () => this.hide());

    // Auto-hide timeout ID
    this.autoHideTimeoutId = null;
  }

  /**
   * Show a notification
   * @param {string} message - The message to display
   * @param {string} type - Type of notification: 'success', 'error', or 'info'
   * @param {number} duration - Duration in ms before auto-hiding (0 to disable)
   */
  show(message, type = 'info', duration = 3000) {
    // Clear any existing timeout
    if (this.autoHideTimeoutId) {
      clearTimeout(this.autoHideTimeoutId);
    }

    // Update notification content and style
    this.notificationMessage.textContent = message;

    // Remove previous type classes
    this.notificationElement.classList.remove('success', 'error', 'info');

    // Add appropriate type class
    if (['success', 'error', 'info'].includes(type)) {
      this.notificationElement.classList.add(type);
    }

    // Show the notification
    this.notificationElement.classList.remove('hidden');

    // Set auto-hide if duration is provided
    if (duration > 0) {
      this.autoHideTimeoutId = setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  /**
   * Hide the notification
   */
  hide() {
    this.notificationElement.classList.add('hidden');
  }
}
