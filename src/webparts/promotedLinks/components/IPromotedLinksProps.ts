import { IPromotedLinksWebPartProps } from '../IPromotedLinksWebPartProps';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IPromotedLinksProps extends IPromotedLinksWebPartProps {
  isWorkbench: boolean;
  siteUrl: string;
  spHttpClient: SPHttpClient;
}

export interface IPromotedLinkDataItem {
  Title: string;
  ImageUrl: string;
  Description: string;
  LinkUrl: string;
}

