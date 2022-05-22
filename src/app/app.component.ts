import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  timerSubscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.timerSubscription = timer(0, 1000).pipe(
      map(() => {
        var date = new Date()
        var seconds = dec2bin(date.getSeconds())
        var minutes = dec2bin(date.getMinutes())
        var hours = dec2bin(date.getHours())
        for (var i = 0; i < hours.length; i++) {
          this.dotsArray[i] = parseInt(hours.charAt(i));
        }
        for (var i = 0; i < minutes.length; i++) {
          this.dotsArray[i+6] = parseInt(minutes.charAt(i));
        }
        for (var i = 0; i < seconds.length; i++) {
          this.dotsArray[i+12] = parseInt(seconds.charAt(i));
        }
      })
    ).subscribe();

    function dec2bin(num: number): string {
      var binaryStr = num.toString(2);

      while (binaryStr.length < 6) {
        binaryStr = "0" + binaryStr;
      }
      return binaryStr
    }
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  }

  title = 'binaryClock';
  dots = Array(18).fill(0)
  dotsArray = Array(18).fill(0)
  year = new Date().getFullYear()

}
