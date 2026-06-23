import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Analytic, ResultRow } from '@models';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [DecimalPipe, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css',
})

export class ResultsTableComponent {
  readonly rows = input<ResultRow[]>([]);
  readonly columns = input<Analytic[]>([]);
  readonly loading = input<boolean>(false);

  readonly displayedColumns = computed(() => [
    'nodeName',
    ...this.columns().map((c) => c.id),
  ]);
}
