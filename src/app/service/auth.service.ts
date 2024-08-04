import {Injectable} from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private initialized = false;

  private user: User | null = null;

  /* injecting Auth Service*/
  constructor(private auth: Auth, routerService: Router) {
    /* listen to auth state */
    authState(auth).subscribe((user: User | null) => {
      /* if a notification comes update user ( logged in user or null ) */
      this.user = user;
      this.initialized = true;
      if (user) {
        /* if signed in */
        routerService.navigateByUrl('/');
      } else {
        /* if user is null */
        routerService.navigateByUrl('/sign-in');
      }
    });
  }

  /* to get currently logged in user => principal */
  getPrincipal() {
    return this.user;
  }

  /* get current logged user's email */
  getPrincipalEmail() {
    return this.user?.email ?? /* if user email is null or undefined then do below */
      this.user?.providerData?.at(0)?.email;
  }

  signInWithGoogle() {
    /* popup */
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signInWithGitHub() {
    /* popup */
    signInWithPopup(this.auth, new GithubAuthProvider());
  }

  signIn() {
    /* popup */
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    /* sign out */
    signOut(this.auth);
  }

  /* return whether user is initialized */
  isInitialized() {
    return this.initialized;
  }
}
