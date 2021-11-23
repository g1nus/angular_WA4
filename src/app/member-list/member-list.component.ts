import { Component, OnInit } from '@angular/core';
import { DataCacheService } from '../shared/data-cache.service';
import { Member } from '../shared/member';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  Member: Member[] = [];

  constructor(public restApi: RestApiService, private dataCache: DataCacheService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    if(this.dataCache.members.length !== 0){
      console.log("DATA IS SAVED IN CACHE")
      this.Member = this.dataCache.members;
    }else{
      this.restApi.getMembers().subscribe((data: Member[]) => {
        console.log("GOT THIS DATA");
        console.log(data);
        this.Member = data;
        this.dataCache.members = data;
      })
    }
  }

}
