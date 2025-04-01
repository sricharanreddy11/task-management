import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevAPIService } from '../dev.service';
import { FormsModule } from '@angular/forms';
import { AuthenticatorService } from '../../authenticator/authenticator.service';
import { TaskService } from '../tasks/tasks.service';
import { Note } from '../note-maker/note.model';
import { NoteService } from '../note-maker/note.service';

@Component({
  selector: 'app-command-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './command-search.component.html',
  styleUrl: './command-search.component.css'
})
export class CommandSearchComponent {
  isOpen = false;
  searchQuery: string = '';
  isAuthenticated = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private devAPIService: DevAPIService,
    private authService: AuthenticatorService,
    private tasksService: TaskService,
    private noteService: NoteService
    ) {}

  ngOnInit() {
    this.checkAuthStatus();
    this.openSearch(); // Open search when app starts
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
  }


  // Listen for keyboard shortcuts
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
      this.checkAuthStatus();
      event.preventDefault();
      this.toggleSearch();
    }
    if (event.key === 'Escape') {
      this.closeSearch();
    }
  }

  suggestions: string[] = ['Create a Task ', 'Show Tasks', 'Interact with Assistant', 'Show Projects', 'Check Alerts'];

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.executeCommand();
  }


  toggleSearch() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.focusInput(), 0);
    }
  }

  openSearch() {
    console.log(this.isAuthenticated);
    this.isOpen = true;
    setTimeout(() => this.focusInput(), 0);
  }

  closeSearch() {
    this.isOpen = false;
    this.searchQuery = '';
  }

  executeCommand() {
    if (!this.searchQuery.trim()) return;

    const paramsObj = { command: this.searchQuery };

    // Send query to backend for processing
    this.devAPIService.executeCommand(paramsObj).subscribe(
      (response) => {
        if (response.route) {
          if (response.route === 'unknown') {
            this.closeSearch();
            this.router.navigate(['dev/dashboard']);
            return;
          }
          else{
            this.closeSearch();
            this.route.url.subscribe(url => console.log(url))
            var creationIntent = response.creation_intent;
            var createdObjId = response.created_obj_id;
            console.log(response);
            if (creationIntent === "true") {
              if(response.route === 'dev/tasks'){
                this.tasksService.getTaskList().subscribe(
                  (resData: any) => {
                  console.log(resData);
                  this.tasksService.tasks = resData;
                  const selectedTask = resData.find((task: any) => task.id == createdObjId);
                  if (selectedTask) {
                    this.tasksService.selectedTask = selectedTask;
                    this.tasksService.openTaskDetailForm();
                  }
                  }
                );
                this.router.navigate([response.route]);
              }
              else if (response.route === 'dev/note-maker'){
                this.devAPIService.getAllNotes().subscribe(
                  (resData: any) => {
                  this.noteService.notes = resData;
                  const selectedNote = resData.find((note: Note) => note.id == createdObjId);
                  if (selectedNote) {
                    this.noteService.selectedNote = selectedNote;
                  }
                  }
                );
                this.router.navigate([response.route]);
              }
              else{
                this.router.navigate([`${response.route}/${createdObjId}`]);
              }
            }
            else {
            this.router.navigate([response.route]);
          }
        }
      }},
      (error) => {
        console.error('Error fetching route:', error);
      }
    );
  }

  private focusInput() {
    const input = document.querySelector('input');
    if (input) input.focus();
  }
}
