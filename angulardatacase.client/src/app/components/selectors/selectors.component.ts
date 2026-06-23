import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { SelectToggleComponent } from '@components/select-toggle/select-toggle.component';
import { Analytic, DataSet, Grouping } from '@models';

@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [ReactiveFormsModule, SelectToggleComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  template: `
    <section class="field">
      <h3>Dataset</h3>
      <app-select-toggle [options]="dataSets" formControlName="dataSet" />
    </section>
    <section class="field">
      <h3>Grouping</h3>
      <app-select-toggle [options]="groupings" formControlName="grouping" />
    </section>
    <section class="field">
      <h3>Analytics <small>(choose at least one)</small></h3>
      <app-select-toggle [multiple]="true" [options]="analytics" formControlName="analytics" />
    </section>
  `,
})
export class SelectorsComponent {
  @Input() dataSets: DataSet[] = [];
  @Input() groupings: Grouping[] = [];
  @Input() analytics: Analytic[] = [];
}
