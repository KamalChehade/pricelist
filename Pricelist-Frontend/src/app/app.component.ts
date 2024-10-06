import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Admin';


  constructor(private titleService: Title, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/admin')) {
          this.titleService.setTitle('AdminPanel');
        } else if (event.url.startsWith('/login')) {
          this.titleService.setTitle('Login');
        } else {
          this.titleService.setTitle('Pricelist');
        }
      }
    });
  }

}
