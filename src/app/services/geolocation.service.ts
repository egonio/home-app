import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService  {

  constructor() { }

  public getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
}
