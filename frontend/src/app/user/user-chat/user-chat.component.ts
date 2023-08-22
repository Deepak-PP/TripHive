import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
})
export class UserChatComponent implements OnInit {
  userdata: any;
  viewerId: string;
  messages: any = [];
  message: string = '';
  chatShow: boolean = false;
  userId: string;

  constructor() {}

  ngOnInit(): void {
    this.getchatslist();
   
  }

  getchatslist() { }

  fullchat(agencyId: string) {
    this.viewerId = agencyId;
    this.chatShow = true;
  }
}
