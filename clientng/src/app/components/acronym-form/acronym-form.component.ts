import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Acronym } from '../../models/acronym.model';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-acronym-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './acronym-form.component.html',
  styleUrls: ['./acronym-form.component.css']
})
export class AcronymFormComponent {
  @Output() addAcronym = new EventEmitter<Omit<Acronym, 'id'>>();

  isFormVisible = false;
  acronym = '';
  definition = '';
  description = '';
  formError: string | null = null;

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    // Validation
    if (!this.acronym.trim() || !this.definition.trim()) {
      this.formError = 'Acronym and definition are required';
      return;
    }

    // Create new acronym object
    const newAcronym = {
      acronym: this.acronym.trim(),
      definition: this.definition.trim(),
      description: this.description.trim()
    };

    // Emit the new acronym
    this.addAcronym.emit(newAcronym);

    // Reset form
    this.resetForm();
    this.isFormVisible = false;
  }

  resetForm(): void {
    this.acronym = '';
    this.definition = '';
    this.description = '';
    this.formError = null;
  }
}
