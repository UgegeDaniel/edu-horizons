import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import PageComponents from 'src/pages';
import appComponents from 'src/components';
import ngZorroModules from './ng-zorro-modules';

@NgModule({
  declarations: [
    AppComponent,
    [...appComponents],
    [...PageComponents]
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    [...ngZorroModules]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
