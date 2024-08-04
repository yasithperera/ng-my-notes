import {Routes} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {MainComponent} from "./main/main.component";

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '',
    component: MainComponent
  }
];
