import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { SelectToggleComponent } from '@components/select-toggle/select-toggle.component';
import { Analytic, DataSet, Grouping, SelectorItem } from '@models';

@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [ReactiveFormsModule, SelectToggleComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  template: `
    @for (section of sections; track section.controlName) {
      <section class="field">
        <h3>{{ section.heading }} @if (section.hint) { <small>({{ section.hint }})</small> }</h3>
        <app-select-toggle
          [options]="section.options"
          [multiple]="section.multiple ?? false"
          [formControlName]="section.controlName" />
      </section>
    }
  `,
})
export class SelectorsComponent {
  @Input() sections: SelectorItem[] = [];
}
