import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AppBarComponent} from "../app-bar/app-bar.component";
import {MatCardModule} from "@angular/material/card";
import {AuthService} from '../service/auth.service';
import {Note, NoteService} from "../service/note.service";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AppBarComponent, MatCardModule, MatIcon, MatFormField, FormsModule, MatInput, MatButton, MatLabel, NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {

  noteList: Array<Note> = [];
  description: string = "";

  updatingNote: Note | null = null;

  isLoading: boolean = true;

  isUpdating: boolean = false;

  /* getting form reference */
  @ViewChild("frm")
  formRef!: ElementRef

  @ViewChild("txt")
  inputRef!: ElementRef;

  constructor(titleService: Title,
              private authService: AuthService,
              protected noteService: NoteService) {
    titleService.setTitle('My Notes app');

    // this.description = "";
    //
    // this.updatingNote = null;
    //
    // this.isUpdating = false;

    noteService.getNotes(authService.getPrincipalEmail()!).subscribe(
      (noteList: Array<Note>) => {
        this.noteList = noteList;
        this.isLoading = false; /* tasks finished loading */
        this.noteList.sort(
          /* compare function
          * to sort in descending order of task added time */
          (note1: Note, note2: Note) => {
            if (note1.timestamp.toMillis() > note2.timestamp.toMillis()) return -1;
            else if (note1.timestamp.toMillis() < note2.timestamp.toMillis()) return 1;
            else return 0;
          }
        )
      }
    );
  }

  async addNote(txt: HTMLInputElement) {
    if (!this.description.trim().length) {
      txt.select();
      txt.focus();
      return;
    } else {
      try {
        await this.noteService.createNewNote(this.description,
          this.authService.getPrincipalEmail()!)
          .then(this.formRef.nativeElement.reset()); /* reset form after adding note */
      } catch (e) {
        console.log(e);
        alert('Failed to save the note, try again');
      }
    }
  }

  async updateNote(txt: HTMLInputElement) {
    if (!this.description.trim().length) {
      txt.select();
      txt.focus();
      return;
    } else {
      this.updatingNote!.description = txt.value;
      try {
        await this.noteService.updateNote(this.updatingNote!)
          .then(this.formRef.nativeElement.reset()
            /*this.resetFormAfterUpdate*/); /* reset form after updating note */

        this.updatingNote = null;
        // this.description = "";
        this.isUpdating = false;
      } catch (e) {
        console.log(e);
        alert('Failed to update the note, try again');
      }
    }
  }

  setTextOfNoteToTextField(text: string) {
    // (this.inputRef.nativeElement as HTMLInputElement).value = text;
    // console.log("click");
    this.description = text;
  }

  resetFormAfterUpdate(): void {
    // this.updatingNote = null;
    // this.description = "";
    // this.isUpdating = false;
    (this.inputRef.nativeElement as HTMLInputElement).value = "";
  }

  protected readonly console = console;
}
