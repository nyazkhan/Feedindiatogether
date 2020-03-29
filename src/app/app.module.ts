import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NeedyFormComponent } from './module/needy-form/needy-form.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { NeedHelpComponent } from './component/form/need-help/need-help.component';
import { IWantToHelpComponent } from './component/form/i-want-to-help/i-want-to-help.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { FooterComponent } from './core/footer/footer.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    NeedyFormComponent,
    NeedHelpComponent,
    IWantToHelpComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DataTableModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
