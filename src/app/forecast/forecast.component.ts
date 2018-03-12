import { Component, OnInit } from '@angular/core';
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
export class ForecastComponent implements OnInit {

  latitude: number;
  longitude: number;
  fourDayForecast: ForecastDay[];

  constructor( private geoLocation: GeolocationService, private weatherAPIService: WeatherAPIService) { }

  async ngOnInit() {
    await this.getLocation();
    this.getForecast();
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
