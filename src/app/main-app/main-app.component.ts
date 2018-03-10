import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

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




interface CoordinatesResponse {
  coords: {
      latitude: number;
      longitude: number;
    };
  timestamp: number;
}

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  static METRIC = 'METRIC';
  static IMPERIAL = 'IMPERIAL';
  static FORECAST = 'FORECAST';
  static CONDITIONS = 'CONDITIONS';


  constructor( private http: HttpClient) { }

  hour: number;
  minute: number;
  second: number;
  time: Date;
  timeString: String;
  date: String;
  longitude: number;
  latitude: number;
  weatherAPI = '9203778439be69d8';
  forecastURL = 'http://api.wunderground.com/api/9203778439be69d8/forecast/q/';
  conditionsURL = 'http://api.wunderground.com/api/9203778439be69d8/conditions/q/';



  settings: {
    unit_of_measure: string;
  } = {
    unit_of_measure: MainAppComponent.METRIC,
  };


  /****** CONDITIONS ******/
  city: string;
  country: string;
  state: string;
  feelslike: string;
  weather: string;
  temp: string;
  wind_dir: string;
  wind_gust: string;
  wind: string;
  windchill: string;
  relative_humidity: string;
  pressure_in: string;
  pressure_trend: string;
  precip_today: string;
  /* ------- END OF CONDITIONS -------- */

  /******** FORECAST ***************/

   /* ------- END OF FORECAST -------- */

  fourDayForecast: ForecastDay[];
  weatherResponse;

  weatherWindow = MainAppComponent.CONDITIONS;

  ngOnInit() {
    this.getTime();
    this.getDate();
    this.getLocation();
  }

   getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  async getWeather() {
    try {
      this.weatherResponse = await this.http.get<ConditionsResponse>(this.conditionsURL + this.latitude + ',' + this.longitude + '.json').toPromise();
      this.weatherWindow = MainAppComponent.CONDITIONS;
      const directory = this.weatherResponse.current_observation;
      this.city = directory.display_location.city;
      this.country = directory.display_location.country;
      this.state =  directory.display_location.state;
      this.weather = directory.weather;
      this.wind_dir = directory.wind_dir;
      this.relative_humidity = directory.relative_humidity;
      this.pressure_in = directory.pressure_in;
      this.pressure_trend = directory.pressure_trend;
      if (this.settings.unit_of_measure === MainAppComponent.METRIC) {
        this.feelslike = directory.feelslike_c + ' C';
        this.temp = directory.temp_c + ' C';
        this.wind_gust = directory.wind_gust_kph + ' km/h';
        this.wind = directory.wind_kph + ' km/h';
        this.windchill = directory.windchill_c + ' C';
        this.precip_today = directory.precip_today_metric + ' mm';
      } else {
        this.feelslike = directory.feelslike_f + ' F';
        this.temp = directory.temp_f + ' F';
        this.wind_gust = directory.wind_gust_mph + ' m/h';
        this.wind = directory.wind_mph + ' m/h';
        this.windchill = directory.windchill_f + ' F';
        this.precip_today = directory.precip_today_in + ' in';
      }
      console.log(this.weatherResponse);
    } catch (error) {
      console.log(error);
    }
  }

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


  // Promise way

  getTime() {
    this.time = new Date();
    setTimeout( () => {
      this.timeString = new Date().toLocaleTimeString();
      this.getTime();
    }, 1000);
    /*
    setInterval(() => {
      this.hour = this.time.getHours();
      this.minute = this.time.getMinutes();
      this.second = this.time.getSeconds();
     }, 1000);
     */
  }

  getDate() {
    this.date = new Date().toDateString();
  }

  getLocationOldWay() {
    this.getPosition()
      .then(
        (position) => {
          console.log(position);
        }
      ).catch (
        (error) => {
          console.log(error);
        }
      );
  }

  async getForecast() {
    try {
       // tslint:disable-next-line:max-line-length
      const response = await this.http.get<ForecastResponse>(this.forecastURL + this.latitude + ',' + this.longitude + '.json').toPromise();
      console.log(response);
      this.fourDayForecast = response.forecast.simpleforecast.forecastday;
      this.weatherWindow = MainAppComponent.FORECAST;
      console.log(this.fourDayForecast);
    } catch (error) {
      console.log(error);
    }
  }

  /*
   getForecastNotAsync() {
    this.http.get(this.weatherURL + 'lat=' + this.latitude + '&lon=' + this.longitude + '&appid=' + this.weatherAPI + '&units=metric')
        .toPromise().then(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    }
  */

  async getLocation() {
    try {
      const position: CoordinatesResponse = await this.getPosition() as CoordinatesResponse;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(position);
    } catch (error) {

    }
  }
}
