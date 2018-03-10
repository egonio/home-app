import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

interface WeatherResponse {
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  main: {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

interface ForecastResponse {
  city: string;
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

  constructor( private http: HttpClient) { }

  hour: number;
  minute: number;
  second: number;
  time: Date;
  timeString: String;
  date: String;
  longitude: number;
  latitude: number;
  weatherAPI = '6bad6663746be9e7d0a8ac040d60a419';
  weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
  forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?';
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  weatherType: string;
  weatherDescription: string;
  weatherID: number;
  city: string;
  wind: number;
  country: string;


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
      const response = await
      // tslint:disable-next-line:max-line-length
      this.http.get<WeatherResponse>(this.weatherURL + 'lat=' + this.latitude + '&lon=' + this.longitude + '&appid=' + this.weatherAPI + '&units=metric')
        .toPromise();
      this.currentTemp = response.main.temp;
      this.maxTemp = response.main.temp_max;
      this.minTemp = response.main.temp_min;
      this.weatherType = response.weather[0].main;
      this.weatherDescription = response.weather[0].description;
      this.weatherID = response.weather[0].id;
      this.city = response.name;
      this.wind = response.wind.speed * 3.6;
      this.country = response.sys.country;
      console.log(response);
    } catch (error) {

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
      const response = await
      // tslint:disable-next-line:max-line-length
      this.http.get(this.forecastURL + 'lat=' + this.latitude + '&lon=' + this.longitude + '&appid=' + this.weatherAPI + '&units=metric')
        .toPromise();
      console.log(response);
    } catch (error) {

    }

  }

  // async way
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
