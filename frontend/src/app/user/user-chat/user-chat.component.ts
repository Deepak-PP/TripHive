import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { userService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
})
export class UserChatComponent implements OnInit {
  connectionId: string = '';
  userData: any;
  viewerId: string;
  messages: any = [];
  message: string = '';
  chatShow: boolean = false;
  userId: string;
  agencyIdToGet: string
  lastMessage:any

  constructor(
    private socket: Socket,
    private userService: userService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jsonString = params['data'];
      this.agencyIdToGet = JSON.parse(jsonString);
      console.log(this.agencyIdToGet);
    });
    this.getchatslist(this.agencyIdToGet);
    this.socket.on('message recieved', (newMessage: any) => {
      console.log(newMessage, 'message recieved');

      if (this.viewerId == newMessage.from) {
        this.messages.push(newMessage);
        console.log(newMessage,"this is the new message recieved");
        
        this.lastMessage = newMessage
      }
    });
  }

  getchatslist(id:string) {
    this.userService.userchatlist(id).subscribe((res: any) => {
      console.log(res, 'resresres');

      this.userData = res.data;
      console.log(this.userData, 'got userdata');

      this.socket.emit('setup', res.id);
      
    });
    return id;
  }

  fullchat(agencyId: string) {
    this.viewerId = agencyId;
    this.chatShow = true;
    this.userService.chatBlock(agencyId).subscribe((response) => {
      console.log(response, 'full chat response');

      this.socket.emit('join', response.cid);
      this.messages = response.result;
      this.connectionId = response.cid;
      this.userId = response.userid;
    });
  }

  submit() {
    if (this.message == '') {
      this.userService.swalFire('Please type message');
    } else {
      const data = {
        connectionid: this.connectionId,
        from: this.userId,
        to: this.viewerId,
        message: this.message,
      };
      console.log(data, 'this is the message data');
      if (!data.connectionid) {
        this.userService.swalFire('Please select a chat');
      }

      this.userService.sentMessage(data).subscribe((res) => {
        this.message = '';
        this.messages.push(res);
        this.socket.emit('chatMessage', res);
      });
    }
  }
}
