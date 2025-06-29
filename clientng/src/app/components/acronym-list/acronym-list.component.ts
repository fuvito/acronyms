import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Acronym } from '../../models/acronym.model';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-acronym-list',
  standalone: true,
  imports: [CommonModule, TruncatePipe, MaterialModule],
  templateUrl: './acronym-list.component.html',
  styleUrls: ['./acronym-list.component.css']
})
export class AcronymListComponent {
  @Input() acronyms: Acronym[] = [];
  @Input() loading = false;
}
