import { WeatherAPIService } from './../services/weatherAPI.service';
import { GeolocationService } from './../services/geolocation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs/Subscription';

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
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  latitude: number;
  longitude: number;


  /****** CONDITIONS ******/
  city: string;
  country: string;
  state: string;
  feelslike_c: string;
  feelslike_f: string;
  weather: string;
  temp_c: string;
  temp_f: string;
  wind_dir: string;
  wind_gust_kph: string;
  wind_gust_mph: string;
  wind_kph: string;
  wind_mph: string;
  windchill_c: string;
  windchill_f: string;
  relative_humidity: string;
  pressure_in: string;
  pressure_trend: string;
  precip_today_in: string;
  precip_today_metric: string;
  /* ------- END OF CONDITIONS -------- */

  /******* SETTINGS  **********/
  unit: String;
  unitSubscription: Subscription;

  /* ------- END OF CONDITIONS -------- */


  constructor(private geoLocation: GeolocationService,
              private weatherAPIService: WeatherAPIService,
              private settings: SettingsService) { }

  async ngOnInit() {
    await this.getLocation();
    this.getWeather();

    this.unitSubscription = this.settings.getUnitObservable().subscribe(
      unit => {
        this.unit = unit;
      });
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

  async getWeather() {
    try {
      const weatherResponse =  await this.weatherAPIService.getWeather(this.longitude, this.latitude);
      console.log(weatherResponse);
      const directory = weatherResponse.current_observation;
      this.city = directory.display_location.city;
      this.country = directory.display_location.country;
      this.state = directory.display_location.state;
      this.feelslike_c = directory.feelslike_c;
      this.feelslike_f = directory.feelslike_f;
      this.weather = directory.weather;
      this.temp_c = directory.temp_c;
      this.temp_f = directory.temp_f;
      this.wind_dir = directory.wind_dir;
      this.wind_gust_kph = directory.wind_gust_kph;
      this.wind_gust_mph = directory.wind_gust_mph;
      this.wind_kph = directory.wind_kph;
      this.wind_mph = directory.wind_mph;
      this.windchill_c = directory.windchill_c;
      this.windchill_f = directory.windchill_f;
      this.relative_humidity = directory.relative_humidity;
      this.pressure_in = directory.pressure_in;
      this.pressure_trend = directory.pressure_trend;
      this.precip_today_in = directory.precip_today_in;
      this.precip_today_metric = directory.precip_today_in;
    } catch (error) {
      console.log(error);
    }
  }


}
