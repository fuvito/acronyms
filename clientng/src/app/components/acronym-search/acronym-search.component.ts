import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-acronym-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './acronym-search.component.html',
  styleUrls: ['./acronym-search.component.css']
})
export class AcronymSearchComponent {
  @Output() search = new EventEmitter<{ query: string, type: 'acronym' | 'definition' }>();

  searchQuery: string = '';
  searchType: 'acronym' | 'definition' = 'acronym';

  onSubmit(): void {
    if (this.searchQuery.trim()) {
      this.search.emit({
        query: this.searchQuery,
        type: this.searchType
      });
    }
  }
}
