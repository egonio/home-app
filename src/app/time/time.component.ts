import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  time;
  timeString;
  date;

  constructor() { }

  ngOnInit() {
    this.getTime();
    this.getDate();
  }

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
}
