import { Component, Input, OnInit } from '@angular/core';
import { userService } from '../../user.service';
import { UserChatComponent } from '../user-chat.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  agencyIdToGet: string;
  userData: any;
  messages: any = [];
  lastMessage:any
  @Input() data: any;

  constructor(
    private userService: userService,
    private chatcomponent: UserChatComponent
  ) {}

  ngOnInit(): void {
    this.agencyIdToGet = this.chatcomponent.agencyIdToGet;
    this.messages = this.chatcomponent.messages;
    this.lastMessage = this.chatcomponent.lastMessage;
    this.getchatslist(this.agencyIdToGet);
  }

  getchatslist(id: string) {
    this.userService.userchatlist(id).subscribe((res: any) => {
      this.userData = res.data;
    });
  }

  fullchat(id: string) {
    this.chatcomponent.fullchat(id);
  }
}
