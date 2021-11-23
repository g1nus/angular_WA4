import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataCacheService } from '../shared/data-cache.service';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  constructor(public restApi: RestApiService, private dataCache: DataCacheService, public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
