import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/member';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  Member: Member[] = [];

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    return this.restApi.getMembers().subscribe((data: Member[]) => {
      console.log("GOT THIS DATA");
      console.log(data);
      this.Member = data;
    })
  }

}
