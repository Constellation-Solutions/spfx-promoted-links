export interface IPromotedLinksWebPartProps {
  listId: string;
  numberOfItems: number;
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ISPLists {
  value: ISPList[];
}