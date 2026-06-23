import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Analytic, CalculateNode, DataSet, Grouping, GroupingNode } from '@models';


@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/data';

  readonly dataSets$: Observable<DataSet[]> = this.http
    .get<DataSet[]>(`${this.base}/GetDataSets`)
    .pipe(shareReplay(1));

  readonly groupings$: Observable<Grouping[]> = this.http
    .get<Grouping[]>(`${this.base}/GetGroupings`)
    .pipe(shareReplay(1));

  readonly analytics$: Observable<Analytic[]> = this.http
    .get<Analytic[]>(`${this.base}/GetAnalytics`)
    .pipe(shareReplay(1));

  getNodeNames(grouping: string): Observable<GroupingNode[]> {
    const params = new HttpParams().set('grouping', grouping);
    return this.http.get<GroupingNode[]>(`${this.base}/GetNodeNames`, { params });
  }

  calculate(
    analytic: string,
    grouping: string,
    dataSet: number,
  ): Observable<CalculateNode[]> {
    const params = new HttpParams()
      .set('analytic', analytic)
      .set('grouping', grouping)
      .set('dataSet', dataSet);
    return this.http.get<CalculateNode[]>(`${this.base}/Calculate`, { params });
  }
}
