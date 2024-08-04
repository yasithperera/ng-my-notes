import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../service/auth.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [MatIconModule, MatButton],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent implements AfterViewInit {

  displayMenu = false;
  @ViewChild('profilePic')
  private profilePicRef!: ElementRef<HTMLDivElement>;

  constructor(protected authService: AuthService) {

  }

  ngAfterViewInit(): void {
    /* setting user's profile picture */
    this.profilePicRef.nativeElement
      .style.backgroundImage =
      `url('${this.authService.getPrincipal()?.photoURL}')`;
  }

  /* to make menu invisible */
  @HostListener("document:click")
  onDocumentClick() {
    this.displayMenu=false;
  }


}
