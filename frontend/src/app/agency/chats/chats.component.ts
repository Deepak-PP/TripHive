import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { agencyService } from '../agency.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  userId: string = '';
  connectionId: string = '';
  viewerId: string;
  messages: any = [];
  message: string = '';
  chatShow: boolean = false;
  agencyId: string;
  agencyChatData: any;

  constructor(private socket: Socket, private agencyService: agencyService) {}

  ngOnInit(): void {
    this.getchatslist();
    this.agencyService.getNewMessage().subscribe(
      (res) => { 
        this.fullchat(this.userId)
      })
  }

  getchatslist() {
    console.log("herererererengoniitt");
    
    this.agencyService.agencyChatList().subscribe(
      (res) => {

      console.log(res, 'resresres');

      this.agencyChatData = res.data;
      console.log(this.agencyChatData, 'got agencychatdata');

      this.socket.emit('setup', res.id);
      },
      (error) => { console.log(error);
      })
  }

  fullchat(userId: string) {
    this.userId = userId;
    this.chatShow = true;
    this.agencyService.chatBlock(userId).subscribe((response) => {
      console.log(response, 'full chat response');

      this.socket.emit('join', response.cid);
      this.messages = response.result;
      this.connectionId = response.cid;
      this.agencyId = response.prof;
    });
  }

  submit() {
    if (this.message == '') {
      this.agencyService.swalFire('Please type message');
    } else {
      const data = {
        connectionid: this.connectionId,
        from: this.agencyId,
        to: this.userId,
        message: this.message,
      };
      console.log(data, 'this is the message data');
      if (!data.connectionid) {
        this.agencyService.swalFire('Please select a chat');
      }

      this.agencyService.sendMessage(data).subscribe((res) => {
        console.log(res,"ressenddattasenddatra");
        
        this.message = '';
        this.messages.push(res);
        this.socket.emit('chatMessage', res);
      });
    }
  }
}
