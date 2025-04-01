import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandSearchService {
  // BehaviorSubject to track the modal state
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  
  // Observable that components can subscribe to
  isOpen$ = this.isOpenSubject.asObservable();

  constructor() { }

  // Method to open the command search
  openCommandSearch(): void {
    this.isOpenSubject.next(true);
  }

  // Method to close the command search
  closeCommandSearch(): void {
    this.isOpenSubject.next(false);
  }

  // Method to toggle the command search
  toggleCommandSearch(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}