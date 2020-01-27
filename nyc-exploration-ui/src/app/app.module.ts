import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './timeline/timeline.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { InputFormComponent } from './input-form/input-form.component';
import { MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    InteractiveMapComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    InputFormComponent
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
