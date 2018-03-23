import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService  {

  constructor() { }

  public getPosition = function () {
    return new Promise(function (resolve, reject) {
      resolve( { coords: {latitude: 43.774467099999995, longitude: -79.5011897 } } );
      // navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
}
