import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ConditionsResponse {
  current_observation:
    {
      display_location: {
        city: string,
        country: string,
        state: string,
      };
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

interface ForecastResponse {
  forecast: {
    simpleforecast: {
      forecastday: ForecastDay[];
    };
  };
}

@Injectable()
export class WeatherAPIService {

  weatherAPI = '9203778439be69d8';
  forecastURL = 'http://api.wunderground.com/api/9203778439be69d8/forecast/q/';
  conditionsURL = 'http://api.wunderground.com/api/9203778439be69d8/conditions/q/';

  constructor(private http: HttpClient) { }

  getWeather(longitude: number, latitude: number) {
    return this.http.get<ConditionsResponse>(this.conditionsURL + latitude + ',' + longitude + '.json').toPromise();
  }

  getForecast(longitude: number, latitude: number) {
    return this.http.get<ForecastResponse>(this.forecastURL + latitude + ',' + longitude + '.json').toPromise();
  }

}
