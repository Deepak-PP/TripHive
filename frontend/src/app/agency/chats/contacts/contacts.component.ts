import { Component, Input, OnInit } from '@angular/core';
import { agencyService } from '../../agency.service';
import { ChatsComponent } from '../chats.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  @Input() data: any;

  constructor(
    private agencyService: agencyService,
    private chatscomponent: ChatsComponent
  ) {}

  ngOnInit(): void {}

  fullchat(id: string) {
    this.chatscomponent.fullchat(id);
  }
}
