import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import { DataService } from './data.service';
import { Analytic, CalculateNode, GroupingNode, ResultRow } from '@models';

@Injectable({ providedIn: 'root' })
export class CalculationService {
  private readonly data = inject(DataService);

  readonly dataSets$ = this.data.dataSets$;
  readonly groupings$ = this.data.groupings$;
  readonly analytics$ = this.data.analytics$;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly rows = signal<ResultRow[]>([]);
  readonly columns = signal<Analytic[]>([]);

  calculate(dataSet: number, grouping: string, analytics: Analytic[]): void {
    if (analytics.length === 0) return;

    this.loading.set(true);
    this.error.set(null);
    this.columns.set(analytics);

    const calcResult$ = analytics.map((analytic) =>
      this.data.calculate(analytic.id, grouping, dataSet).pipe(
        map((results) => ({ analytic, results })),
        catchError(() => of({ analytic, results: [] as CalculateNode[] }))
      ),
    );

    forkJoin({
      nodeNames: this.data.getNodeNames(grouping),
      perAnalytic: forkJoin(calcResult$)
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ nodeNames, perAnalytic }) =>
          this.rows.set(buildResultRows(nodeNames, perAnalytic)),
        error: () =>
          this.error.set('Something went wrong while calculating. Please try again'),
      });
  }
}

export function buildResultRows( 
  nodeNames: GroupingNode[], 
  perAnalytic: Array<{ analytic: Analytic; results: CalculateNode[] }>)
  : ResultRow[] {

  const nameById = new Map(nodeNames.map((n) => [n.id, n.displayName]));
  const rowById = new Map<string, ResultRow>();

  for (const { analytic, results } of perAnalytic) {
    for (const r of results) {
      let row = rowById.get(r.id);
      if (!row) {
        row = { nodeId: r.id, nodeName: nameById.get(r.id) ?? r.id, values: {} };
        rowById.set(r.id, row);
      }
      row.values[analytic.id] = r.result;
    }
  }

  return [...rowById.values()];
}
