import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  query,
  Timestamp, updateDoc,
  where
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {update} from "@angular/fire/database";

export type Note = {
  _id: string,
  description: string,
  user: string,
  timestamp: Timestamp
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  private readonly noteCollectionRef;

  constructor(private fireStore: Firestore) {

    this.noteCollectionRef = collection(fireStore, "note" /* collection name */);


  }

  /* filter this user's notes */
  getNotes(user: string) {
    const queryGetTasks = query(this.noteCollectionRef, where("user",
      "==", user));
    /* request id of doc when getting the task */
    return collectionData(queryGetTasks, {idField: "_id"}) as Observable<Note[]>;

  }

  /* removing note */
  removeNote(note: Note) {
    /* send this document to delete doc method */
    deleteDoc(doc(this.noteCollectionRef, note._id));
  }

  /* method to create a note */
  async createNewNote(description: string, user: string) {
    const newNote = {
      description,
      user,
      timestamp: Timestamp.now() /* timestamp to identify the time, note was added */
    };
    await addDoc(this.noteCollectionRef, newNote);
  }

  /* method to update a note */
  async updateNote(updatingNote: Note) {
    updatingNote.timestamp = Timestamp.now();
    const docRef = doc(this.noteCollectionRef, updatingNote._id);
    await updateDoc(docRef, updatingNote);
  }
}
