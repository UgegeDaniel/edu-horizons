import { Component, Input } from '@angular/core';
import LINKS from '../../utils/links';
import { LINK } from '../../utils/types';import {
  Router, Event, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError, Scroll
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = true;
  links: LINK[] = LINKS;
  currentRoute: string = "";

  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting
        console.log('Route change detected');
      }
      else if (event instanceof NavigationEnd) {
        // Navigation End
        this.currentRoute = event.url;
        // console.log(event.url);
      }
      else if (event instanceof NavigationCancel) {
        //When navigation is canceled.
      }
      else if (event instanceof NavigationError) {
        // Error Show
      }
      else if (event instanceof Scroll) {
        // When the user scrolls.
      }
    });
  }
}
