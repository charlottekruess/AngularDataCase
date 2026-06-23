import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { SelectToggleComponent } from '@components/select-toggle/select-toggle.component';
import { SelectorsComponent } from '@components/selectors/selectors.component';
import { ResultsTableComponent } from '@components/results-table/results-table.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        SelectToggleComponent,
        SelectorsComponent,
        ResultsTableComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with an invalid form (nothing selected yet)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.form.valid).toBe(false);
  });
});
