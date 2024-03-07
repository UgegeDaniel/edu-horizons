import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule
import { NzModalModule } from 'ng-zorro-antd/modal'; // Import NzFormModule
import { NzInputModule } from 'ng-zorro-antd/input'; // Import NzInputModule
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NzButtonModule
import { NzGridModule } from 'ng-zorro-antd/grid'; // Import NzGridModule
import { NzIconModule } from 'ng-zorro-antd/icon'; // Import NzIconModule
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { ModalComponent } from 'src/components/modal/modal.component';
import PageComponents from 'src/pages';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SignUpFormComponent } from 'src/components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from 'src/components/sign-in-form/sign-in-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ModalComponent,
    SignUpFormComponent,
    SignInFormComponent,
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
    NzModalModule,
    NzCheckboxModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzModalModule,
    NzTabsModule,
    NzSelectModule,
    NzCollapseModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
