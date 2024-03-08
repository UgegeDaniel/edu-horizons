import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import PageComponents from 'src/pages';
import ngZorroModules from './ng-zorro-modules';
import appComponents from 'src/components';

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
