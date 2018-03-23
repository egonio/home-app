import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from './../services/settings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherAPIService } from './../services/weatherAPI.service';
import { GeolocationService } from './../services/geolocation.service';

interface Coordinate {
  coords: {
      latitude: number;
      longitude: number;
    };
}

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


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {

  latitude: number;
  longitude: number;
  fourDayForecast: ForecastDay[];
  high: string;
  low: string;
  unit: string;
  unitSubscription: Subscription;

  constructor(private geoLocation: GeolocationService,
              private weatherAPIService: WeatherAPIService,
              private settings: SettingsService) { }

  async ngOnInit() {
    this.unitSubscription = this.settings.getUnitObservable().subscribe(
      unit => {
        this.unit = unit;
    });
    await this.getLocation();
    this.getForecast();
  }

  ngOnDestroy() {
    this.unitSubscription.unsubscribe();
  }

  async getLocation() {
    try {
      const position: Coordinate = await this.geoLocation.getPosition() as Coordinate;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    } catch (error) {
      console.log(error);
    }
  }

  async getForecast() {
    try {
      const response = await this.weatherAPIService.getForecast(this.longitude, this.latitude);
      this.fourDayForecast = response.forecast.simpleforecast.forecastday;
    } catch (error) {
      console.log(error);
    }
  }

}
