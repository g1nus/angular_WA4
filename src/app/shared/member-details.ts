export class MemberDetails {
  PersonID: number | undefined;
  PhotoURL:	string | undefined;
  Notes: string | undefined;
  BirthDate: string | undefined;
  BirthDateIsProtected:	boolean | undefined;
  ParliamentaryName: string | undefined;
  PreferredName: string | undefined;
  GenderTypeID: number | undefined;
  IsCurrent: number | undefined;
  WebURLs: (string | undefined)[] | undefined;
  Party: string | undefined;
  PartyFromDate: string | undefined;
}
