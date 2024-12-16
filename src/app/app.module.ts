import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage-angular';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
  AppRoutingModule, ReactiveFormsModule, 
  IonicStorageModule.forRoot()],
  providers: [FormBuilder,{ provide: RouteReuseStrategy, useClass:
  IonicRouteStrategy },provideHttpClient()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

  })
  export class AppModule {}


