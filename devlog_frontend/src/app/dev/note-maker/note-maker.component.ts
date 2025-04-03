import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from './note.model';
import { DevAPIService } from '../dev.service';
import { NoteService } from './note.service';


@Component({
  selector: 'app-note-maker',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './note-maker.component.html',
  styleUrl: './note-maker.component.css',
})
export class NoteMakerComponent implements OnInit {

  constructor(private devAPIService: DevAPIService, public noteService: NoteService) {}

  ngOnInit(): void {
    this.devAPIService.getAllNotes().subscribe(
      (apiData: Note[]) => {
        this.noteService.notes = apiData;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );

    // Auto-save every 5 minutes
    setInterval(() => {
      if (this.noteService.selectedNote) {
        this.saveNote();
      }
    }, 300000); // 300,000 ms = 5 minutes
  }

  addNewNote() {
    const newNote = { title: 'New Note', content: '', tags: [] };
    this.devAPIService.createNote(newNote).subscribe(
      (apiData: Note) => {
        this.noteService.notes.push(apiData);
        this.selectNote(apiData);
      },
      (error) => {
        console.error('Error creating note:', error);
      }
    );
  }

  selectNote(note: Note) {
    this.noteService.selectedNote = note;
  }

  saveNote() {
    if (this.noteService.selectedNote) {
      this.devAPIService.updateNote(this.noteService.selectedNote, String(this.noteService.selectedNote.id)).subscribe(
        (response) => {
          console.log('Note saved:', response);
        },
        (error) => {
          console.error('Error saving note:', error);
        }
      );
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.saveNote();
    }
  }

}
