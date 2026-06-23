import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectToggleComponent } from '@components/select-toggle/select-toggle.component';
import { SelectorsComponent } from '@components/selectors/selectors.component';
import { ResultsTableComponent } from '@components/results-table/results-table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule, MatCardModule, MatToolbarModule,
    SelectToggleComponent,
    SelectorsComponent,
    ResultsTableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
