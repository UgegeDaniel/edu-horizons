import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/services/api.service';
import LINKS from 'src/utils/links';
import { LINK } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  applinks: LINK[] = LINKS;
  currentLink: LINK | undefined = undefined;
  currentRoute: string = "";
  currentSubRouteName: string | undefined = undefined;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) { }

  getAuthenticatedUser = async () => {
    const existingUser = localStorage.getItem("authenticatedUser")
    if (existingUser) {
      this.isAuthenticated = true;
      return
    }
    try {
      const authenticatedUser = await this.apiService.isAuthenticated();
      if (authenticatedUser) {
        localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
        this.isAuthenticated = true;
        this.message.success("Sign In successful");
      } else {
        console.warn("User not authenticated or no data received");
      }
    } catch (error: any) {
      this.message.error(error.message);
    }
  }

  async ngOnInit() {
    await this.getAuthenticatedUser()
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log("NavigationEnd Event:", event);
        this.currentRoute = event.url;
        const foundLink = this.applinks.find((appLink) => appLink.route === event.url);
        if (!foundLink) {
          const linkWithSubLink = this.applinks.find((appLink) =>
            appLink.subLinks?.find((subLink) =>
              subLink.route === event.url));
          this.currentSubRouteName = linkWithSubLink?.subLinks?.find((subLink) =>
            subLink?.route === event.url)?.name;
          this.currentLink = linkWithSubLink;
          return;
        }
        this.currentLink = foundLink;
        this.currentSubRouteName = "";
      }
    });
  }
}
