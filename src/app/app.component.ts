import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderComponent} from "./loader/loader.component";
import {AuthService} from "./service/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthService,
              titleService: Title) {
    /* change window title */
    titleService.setTitle('Loading - My Notes app');
  }
}
