import { ReactiveFormsModule } from '@angular/forms';
import { GeolocationService } from './services/geolocation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { TimeComponent } from './time/time.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { MainAppComponent } from './main-app/main-app.component';
import { WeatherAPIService } from './services/weatherAPI.service';
import { ForecastComponent } from './forecast/forecast.component';
import { SettingsService } from './services/settings.service';
import { NewsComponent } from './news/news.component';
import { NewsService } from './services/news.service';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    TimeComponent,
    GeolocationComponent,
    MainAppComponent,
    ForecastComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    GeolocationService,
    WeatherAPIService,
    SettingsService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
