import { IPromotedLinksWebPartProps } from '../IPromotedLinksWebPartProps';

export interface IPromotedLinksProps extends IPromotedLinksWebPartProps {
  isWorkbench: boolean;
  siteUrl: string;
}

export interface IPromotedLinkDataItem {
  Title: string;
  ImageUrl: string;
  Description: string;
  LinkUrl: string;
}

