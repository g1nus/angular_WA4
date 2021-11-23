import { Injectable } from '@angular/core';
import { Member } from './member';
import { MemberParties } from './member-parties';
import { Parties } from './parties';
import { Websites } from './websites';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  members: Member[] = [];
  memberParties: MemberParties[] = [];
  parties: Parties[] = [];
  websites: Websites[] = [];
  
  constructor() { }


}
