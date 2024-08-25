import { Component } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.css'
})
export class AssistantComponent {

  userPrompt: string = '';
  messages: Message[] = []; // Array to keep track of the conversation
  isLoading: boolean = false; // Loading state

  constructor(private devAPIService: DevAPIService) {}

  ngOnInit() {
    this.loadMessages();
  }

  sendMessage() {
    if (!this.userPrompt.trim()) {
      return; 
    }

    const paramsObj = { user_prompt: this.userPrompt };
    this.addMessage(this.userPrompt, 'user');
    this.isLoading = true; 

    // Call the API and get the response
    this.devAPIService.getChatbotResponse(paramsObj).subscribe(
      (data: any) => {
        // Add AI's response to the conversation
        this.addMessage(data.content, 'ai');
        this.isLoading = false; // Set loading to false
      },
      (error: any) => {
        console.error('Error:', error);
        this.addMessage('Sorry, something went wrong.', 'ai');
        this.isLoading = false; // Set loading to false
      }
    );
  }

  addMessage(text: string, sender: 'user' | 'ai') {
    this.messages.push({ text, sender });
    this.userPrompt = ''; // Clear input field after sending
    this.saveMessages();
  }

  clearChat() {
    this.messages = [];
    localStorage.removeItem('chatMessages');
  }

  saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }
}
