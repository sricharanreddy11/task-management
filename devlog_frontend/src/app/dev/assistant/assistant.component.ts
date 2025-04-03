import { Component } from '@angular/core';
import { DevAPIService } from '../dev.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, DatePipe],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.css'
})
export class AssistantComponent {
  userPrompt: string = '';
  messages: Message[] = [];
  isLoading: boolean = false;
  userName: string = 'User';

  constructor(private devAPIService: DevAPIService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadMessages();
    this.loadUserName();
  }

  loadUserName() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userName = storedName;
    }
  }

  sendMessage() {
    if (!this.userPrompt.trim()) {
      return;
    }
    const paramsObj = { user_prompt: this.userPrompt };
    this.addMessage(this.userPrompt, 'user');
    this.isLoading = true;
    
    this.devAPIService.getChatbotResponse(paramsObj).subscribe(
      (data: any) => {
        const sanitizedContent: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(data.content);
        this.addMessage(data.content, 'ai');
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error:', error);
        this.addMessage('Sorry, something went wrong.', 'ai');
        this.isLoading = false;
      }
    );
  }

  addMessage(text: string, sender: 'user' | 'ai') {
    this.messages.push({ 
      text, 
      sender, 
      timestamp: new Date() 
    });
    this.userPrompt = '';
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
      this.messages = JSON.parse(savedMessages, (key, value) => {
        if (key === 'timestamp') {
          return new Date(value);
        }
        return value;
      });
    }
  }
}