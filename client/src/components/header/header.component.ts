import { Component, Input } from '@angular/core';
import { User } from 'src/utils/types';

const userDetails: User | null = localStorage.getItem("authenticatedUser")
  ? JSON.parse(localStorage.getItem("authenticatedUser")!)
  : null

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {  
  @Input() isAuthenticated: boolean = false;
  authenticatedUser: string | null = `${userDetails?.given_name} ${userDetails?.family_name}`
  authenticatedUserEmail: string | null = `${userDetails?.email}`
  constructor() { }

  async ngOnInit() {
  }
}
