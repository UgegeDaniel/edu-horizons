import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  Router, Event, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError, Scroll
} from '@angular/router';
import LINKS from 'src/utils/links';
import { LINK } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  isVertical: boolean = true; // Define isVertical property
  applinks: LINK[] = LINKS;
  currentLink: LINK | undefined = undefined;
  currentRoute: string="";
  currentSubRouteName: string | undefined = undefined;
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private router: Router, private fb: NonNullableFormBuilder) { }
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting
        console.log('Route change detected');
      }
      else if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        const foundLink = this.applinks.find((appLink) => appLink.route === event.url )
        if(!foundLink){
          const linkWithSubLink = this.applinks.find((appLink) => appLink.subLinks?.find((subLink) => subLink.route === event.url ))
          this.currentSubRouteName = linkWithSubLink?.subLinks?.find((subLink) => subLink?.route === event.url)?.name
          this.currentLink = linkWithSubLink;
         return
        }
        this.currentLink = foundLink
        this.currentSubRouteName = "";
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
