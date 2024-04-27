import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '@google-cloud/pubsub';
import { Message as Msg } from './Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000');

  sendMessage(message: Msg) {
    this.socket.emit('send-message', message);
  }

  getMessages() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('send-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }
}
