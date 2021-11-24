import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataCacheService } from '../shared/data-cache.service';
import { Member } from '../shared/member';
import { MemberDetails } from '../shared/member-details';
import { MemberParties } from '../shared/member-parties';
import { Parties } from '../shared/parties';
import { RestApiService } from '../shared/rest-api.service';
import { Websites } from '../shared/websites';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  id = parseInt(this.actRoute.snapshot.params['id']);
  memberDetails: MemberDetails | undefined;

  constructor(public restApi: RestApiService, private dataCache: DataCacheService, public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  //=====
  // chain of http requests for getting data (in case it's not cached yet)
  //=====

  //cache basic members data
  loadMember(){
    if(this.dataCache.members.length !== 0){
      console.log("1. members are loaded in cache");
      this.loadWebsite();
    }else{
      console.log("1. members will be fetched")
      this.restApi.getMembers().subscribe((data: Member[]) => {
        this.dataCache.members = data;
        this.loadWebsite();
      })
    }
  }

  //cache websites data
  loadWebsite(){
    if(this.dataCache.websites.length !== 0){
      console.log("2. websites are loaded in cache");
      this.loadMemberParties();
    }else{
      console.log("2. websites will be fetched");
      this.restApi.getWebsites().subscribe((data: Websites[]) => {
        this.dataCache.websites = data;
        this.loadMemberParties();
      })
    }
  }

  //cache member parties
  loadMemberParties(){
    if(this.dataCache.memberParties.length !== 0){
      console.log("3. membersParties are loaded in cache");
      this.loadParties();
    }else{
      console.log("3. membersParties will be fetched")
      this.restApi.getMemberParties().subscribe((data: MemberParties[]) => {
        this.dataCache.memberParties = data;
        this.loadParties();
      })
    }
  }

  //cache parties
  loadParties(){
    if(this.dataCache.parties.length !== 0){
      console.log("4. parties are loaded in cache");
      this.elaborateData();
    }else{
      console.log("4. parties will be fetched")
      this.restApi.getParties().subscribe((data: Parties[]) => {
        this.dataCache.parties = data;
        this.elaborateData();
      })
    }
  }

  //=====
  // data elaboration for finding the member details (data will be searched in the cache)
  //=====

  elaborateData(){
    console.log("5. data will be elaborated now...");
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let memberTmp = this.dataCache.members.find(m => m.PersonID === this.id);
    let dateStr = "No birth date is defined";
    if(memberTmp !== undefined){
      let websites = this.dataCache.websites.filter(w => w.PersonID === this.id);
      let webURLs = websites.map(x => x.WebURL);
      if(memberTmp.BirthDate){
        let date = new Date(memberTmp.BirthDate + "");
        dateStr = "" + (date.getDay() === 0 ? 1 : date.getDay()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
      }
      if(memberTmp.PhotoURL === ""){
        if(memberTmp.GenderTypeID === 2){
          memberTmp.PhotoURL = "/assets/no-pic-m.png";
        }else{
          memberTmp.PhotoURL = "/assets/no-pic-f.png";
        }
      }
      this.memberDetails = {
        ...memberTmp,
        ParliamentaryName: memberTmp.ParliamentaryName?.replace(',', ''),
        BirthDate: dateStr,
        WebURLs: webURLs,
        Party: this.dataCache.parties.find(pd => pd.ID === this.dataCache.memberParties.find(p => p.PersonID === this.id)?.PartyID)?.ActualName
      }
    }
  }

}
