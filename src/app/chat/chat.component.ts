import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  messageContent: string = '';
  messages: string[] = [];
  sender: string = '';
  dest: string = '';
  topicDest: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().subscribe({
      next: (data: any) => {
        console.log(data);
        const message = `Message from ${data.attributes.sender}: ${data.content} received at ${data.receivedAt}`; // Format the message if needed
        this.messages.push(message);
      },
      error: (error: any) => {
        console.error('an error occured!', error);
      }
    }
    );

  }

  sendMessage() {
    const message = {
      message: this.messageContent,
      topicName: this.topicDest,
      attributes: {
        sender: this.sender,
        dest: this.dest
      }
    }
    this.chatService.sendMessage(message);
    this.messageContent = '';
  }
}
