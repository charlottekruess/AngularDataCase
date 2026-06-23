import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CalculationService } from '@services/calculation.service';
import { Analytic, DataSet, Grouping } from '@models';

export function atLeastOne(control: AbstractControl): ValidationErrors | null {
  return Array.isArray(control.value) && control.value.length > 0
    ? null
    : { required: true };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly fb = inject(FormBuilder);
  private readonly calculation = inject(CalculationService);

  readonly dataSets = toSignal(this.calculation.dataSets$, { initialValue: [] as DataSet[] });
  readonly groupings = toSignal(this.calculation.groupings$, { initialValue: [] as Grouping[] });
  readonly analytics = toSignal(this.calculation.analytics$, { initialValue: [] as Analytic[] });

  readonly rows = this.calculation.rows;
  readonly columns = this.calculation.columns;
  readonly loading = this.calculation.loading;
  readonly error = this.calculation.error;

  readonly form = this.fb.group({
    dataSet: this.fb.control<number | null>(null, Validators.required),
    grouping: this.fb.control<string | null>(null, Validators.required),
    analytics: this.fb.nonNullable.control<string[]>([], atLeastOne),
  });

  onCalculate(): void {
    if (this.form.invalid) return;
    const { dataSet, grouping, analytics } = this.form.getRawValue();
    const selected = this.analytics().filter((a) => analytics.includes(a.id));
    this.calculation.calculate(dataSet!, grouping!, selected);
  }
}
