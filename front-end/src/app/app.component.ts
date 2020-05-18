import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {fade} from "./animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})


export class AppComponent {
  showHeader = true;
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url != '/' /*&& !event.url.includes("show")*/) {
          this.showHeader = true;
        } else {
          this.showHeader = false;
        }
      }
    });
  }

}
