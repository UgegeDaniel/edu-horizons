import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule
import { NzInputModule } from 'ng-zorro-antd/input'; // Import NzInputModule
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NzButtonModule
import { NzModalModule } from 'ng-zorro-antd/modal'; // Import NzButtonModule
import { NzGridModule } from 'ng-zorro-antd/grid'; // Import NzGridModule
import { NzIconModule } from 'ng-zorro-antd/icon'; // Import NzIconModule
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/components/header/header.component';
import PageComponents from 'src/pages';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    [...PageComponents]
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule, // Add FormsModule
    ReactiveFormsModule, // Add ReactiveFormsModule
    HttpClientModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    NzFormModule, // Add NzFormModule
    NzInputModule, // Add NzInputModule
    NzButtonModule, // Add NzButtonModule
    NzGridModule,// Add NzGridModule
    NzTableModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
