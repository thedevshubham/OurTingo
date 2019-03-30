import { Component } from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MessagingService } from './messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'rnd';
  message;

 

  constructor(private messagingService: MessagingService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // sendPushNotification() {
   

  //   this.messagingService.sendPushMessage("Web push notification", "HI,visit.  https://angular.io/");
  // }

  ngOnInit() {
    // this.sendPushNotification();
    const userId = '2222';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}