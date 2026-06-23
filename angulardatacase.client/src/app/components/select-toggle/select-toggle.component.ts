import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SelectOption } from '@models';

type ToggleValue = string | number | Array<string | number> | null;

@Component({
  selector: 'app-select-toggle',
  standalone: true,
  imports: [MatButtonToggleModule],
  template: `
    <mat-button-toggle-group
      [multiple]="multiple"
      [hideSingleSelectionIndicator]="!multiple"
      [value]="value"
      [disabled]="disabled"
      (change)="select($event.value)">
      @for (option of options; track option.id) {
        <mat-button-toggle [value]="option.id">{{ option.displayName }}</mat-button-toggle>
      }
    </mat-button-toggle-group>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectToggleComponent), multi: true },
  ],
})
export class SelectToggleComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() multiple = false;

  value: ToggleValue = null;
  disabled = false;

  private onChange: (value: ToggleValue) => void = () => {};
  private onTouched: () => void = () => {};

  select(value: ToggleValue): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ToggleValue): void { this.value = value; }
  registerOnChange(fn: (value: ToggleValue) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}