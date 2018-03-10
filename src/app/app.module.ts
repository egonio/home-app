import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { TimeComponent } from './time/time.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { MainAppComponent } from './main-app/main-app.component';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    TimeComponent,
    GeolocationComponent,
    MainAppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
