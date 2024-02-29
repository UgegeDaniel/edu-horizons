import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule
import { NzInputModule } from 'ng-zorro-antd/input'; // Import NzInputModule
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NzButtonModule
import { NzGridModule } from 'ng-zorro-antd/grid'; // Import NzGridModule
import { NzIconModule } from 'ng-zorro-antd/icon'; // Import NzIconModule
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule
    ReactiveFormsModule, // Add ReactiveFormsModule
    HttpClientModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    NzFormModule, // Add NzFormModule
    NzInputModule, // Add NzInputModule
    NzButtonModule, // Add NzButtonModule
    NzGridModule,// Add NzGridModule
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }