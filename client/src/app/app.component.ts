import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import LINKS from 'src/utils/links';
import { LINK } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  applinks: LINK[] = LINKS;
  currentLink: LINK | undefined = undefined;
  currentRoute: string="";
  currentSubRouteName: string | undefined = undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //Keep track of the current route name and route parameters
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        const foundLink = this.applinks.find((appLink) => appLink.route === event.url )
        if(!foundLink){
          const linkWithSubLink = this.applinks.find((appLink) => appLink.subLinks?.find((subLink) => subLink.route === event.url ))
          this.currentSubRouteName = linkWithSubLink?.subLinks?.find((subLink) => subLink?.route === event.url)?.name
          this.currentLink = linkWithSubLink;
          return;
        }
        this.currentLink = foundLink;
        this.currentSubRouteName = "";
      }
    });
  }
}
