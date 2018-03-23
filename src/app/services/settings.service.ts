import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SettingsService {

  IMPERIAL = 'IMPERIAL';
  METRIC  = 'METRIC';
  private unit = new Subject<string>();
  private unitObservable$ = this.unit.asObservable();

  constructor() {
  }

  useImperial() {
    this.unit.next(this.IMPERIAL);
  }

  useMetric() {
    this.unit.next(this.METRIC);
  }

  getUnitObservable(): Observable<string> {
    return this.unitObservable$;
  }


}
