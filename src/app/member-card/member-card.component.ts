import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../shared/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor() { }

  @Input() member: Member | undefined;

  ngOnInit(): void {
    if(this.member?.PhotoURL === ""){
      if(this.member.GenderTypeID === 2){
        this.member.PhotoURL = "/assets/no-pic-m.png";
      }else{
        this.member.PhotoURL = "/assets/no-pic-f.png";
      }
    }
  }


}
