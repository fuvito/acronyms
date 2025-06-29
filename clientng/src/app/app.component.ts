import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AcronymSearchComponent } from './components/acronym-search/acronym-search.component';
import { AcronymFormComponent } from './components/acronym-form/acronym-form.component';
import { AcronymListComponent } from './components/acronym-list/acronym-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AcronymService } from './services/acronym.service';
import { NotificationService } from './services/notification.service';
import { ErrorService } from './services/error.service';
import { Acronym } from './models/acronym.model';
import { MaterialModule } from './material.module';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    MaterialModule,
    AcronymSearchComponent,
    AcronymFormComponent,
    AcronymListComponent,
    NotificationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Acronym Dictionary';
  acronyms: Acronym[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private acronymService: AcronymService,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.fetchAcronyms();
  }

  fetchAcronyms(): void {
    this.loading = true;
    this.error = null;

    this.acronymService.getAll().subscribe({
      next: (data) => {
        this.acronyms = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorService.handleError(err, 'load acronyms');
        this.error = 'Failed to load acronyms. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSearch(query: string, type: 'acronym' | 'definition'): void {
    this.loading = true;
    this.error = null;

    this.acronymService.search(query, type).subscribe({
      next: (data) => {
        this.acronyms = data;
        this.loading = false;
        this.notificationService.info(`Found ${data.length} results for ${type}: "${query}"`);
      },
      error: (err) => {
        this.errorService.handleError(err, `search acronyms by ${type}`);
        this.error = `Failed to search acronyms. Please try again later.`;
        this.loading = false;
      }
    });
  }

  onAddAcronym(newAcronym: Omit<Acronym, 'id'>): void {
    this.loading = true;
    this.error = null;

    this.acronymService.create(newAcronym).subscribe({
      next: (createdAcronym) => {
        this.acronyms = [...this.acronyms, createdAcronym];
        this.loading = false;
        this.notificationService.success(`Acronym "${createdAcronym.acronym}" added successfully!`);
      },
      error: (err) => {
        this.errorService.handleError(err, 'add acronym');
        this.error = 'Failed to add acronym. Please try again later.';
        this.loading = false;
      }
    });
  }
}
