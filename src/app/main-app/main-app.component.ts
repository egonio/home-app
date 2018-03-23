import { Observable } from 'rxjs/Observable';
import { SettingsService } from './../services/settings.service';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

interface ForecastDay {
  date: {
    monthname: string;
    weekday: string;
    day: number; };
  pop: number;
  conditions: string;
  high: {
    celsius: string;
    fahrenheit: string; };
  low: {
    celsius: string;
    fahrenheit: string; };
  avehumidity: number;
}

export const WEATHER = 'WEATHER';
export const MAIL = 'MAIL';
export const SOCIAL = 'SOCIAL';
export const NEWS = 'NEWS';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit, OnDestroy {

  constructor(private settings: SettingsService) { }
  unit = '';
  private unitSubscription: Subscription;
  mode = '';

  async ngOnInit() {
    this.unitSubscription = this.settings.getUnitObservable().subscribe(
      unit => {
        this.unit = unit;
    });
    await this.useMetric();
  }

  ngOnDestroy() {
    this.unitSubscription.unsubscribe();
  }

  useImperial() {
    this.settings.useImperial();
  }

  useMetric() {
    this.settings.useMetric();
  }

  showWeather() {
    this.mode = WEATHER;
  }

  showMail() {
    this.mode = MAIL;
  }

  showSocial() {
    this.mode = SOCIAL;
  }

  showNews() {
    this.mode = NEWS;
  }



  /*

  changeUnits(unit: string) {
    let directory;
    if (this.city != null) {
       directory = this.weatherResponse.current_observation;
    }
    if (unit === MainAppComponent.METRIC) {
      console.log('change unit to metric');
      this.settings.unit_of_measure = MainAppComponent.METRIC;
      if (this.city != null) {
        this.feelslike = directory.feelslike_c + ' C';
        this.temp = directory.temp_c + ' C';
        this.wind_gust = directory.wind_gust_kph + ' km/h';
        this.wind = directory.wind_kph + ' km/h';
        this.windchill = directory.windchill_c + ' C';
        this.precip_today = directory.precip_today_metric + ' mm';
      }
    } else {
      this.settings.unit_of_measure = MainAppComponent.IMPERIAL;
      if (this.city != null) {
        this.feelslike = directory.feelslike_f + ' F';
        this.temp = directory.temp_f + ' F';
        this.wind_gust = directory.wind_gust_mph + ' m/h';
        this.wind = directory.wind_mph + ' m/h';
        this.windchill = directory.windchill_f + ' F';
        this.precip_today = directory.precip_today_in + ' in';
      }
    }
  }
  */

}
