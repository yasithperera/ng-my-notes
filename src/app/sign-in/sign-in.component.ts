import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Title} from "@angular/platform-browser";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  /* injecting Auth Service and Title Service */
  constructor(public authService: AuthService,
              titleService: Title) {
    /* changing title */
    titleService.setTitle("Sign-in My Notes app");
  }

}
