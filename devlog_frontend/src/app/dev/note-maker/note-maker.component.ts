import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from './note.model';
import { DevAPIService } from '../dev.service';


@Component({
  selector: 'app-note-maker',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './note-maker.component.html',
  styleUrl: './note-maker.component.css',
})
export class NoteMakerComponent implements OnInit {

  notes: Note[] = [];
  selectedNote!: Note;

  constructor(private devAPIService: DevAPIService) {}

  ngOnInit(): void {
    this.devAPIService.getAllNotes().subscribe(
      (apiData: Note[]) => {
        this.notes = apiData;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );

    // Auto-save every 5 minutes
    setInterval(() => {
      if (this.selectedNote) {
        this.saveNote();
      }
    }, 300000); // 300,000 ms = 5 minutes
  }

  addNewNote() {
    const newNote = { title: 'New Note', content: '', tags: [] };
    this.devAPIService.createNote(newNote).subscribe(
      (apiData: Note) => {
        this.notes.push(apiData);
        this.selectNote(apiData);
      },
      (error) => {
        console.error('Error creating note:', error);
      }
    );
  }

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  saveNote() {
    if (this.selectedNote) {
      this.devAPIService.updateNote(this.selectedNote, String(this.selectedNote.id)).subscribe(
        (response) => {
          console.log('Note saved:', response);
        },
        (error) => {
          console.error('Error saving note:', error);
        }
      );
    }
  }

}
