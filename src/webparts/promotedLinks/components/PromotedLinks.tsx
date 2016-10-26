import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../PromotedLinks.module.scss';
import { IPromotedLinksWebPartProps } from '../IPromotedLinksWebPartProps';

import PromotedLinkItem, { IPromotedLinkItemProps } from './PromotedLinkItem'

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

export interface IPromotedLinksState {
  listData: IPromotedLinkDataItem[];
}

export default class PromotedLinks extends React.Component<IPromotedLinksProps, IPromotedLinksState> {

  constructor(props: IPromotedLinksProps, state: IPromotedLinksState) {
    super(props);

    this.state = { listData: [] };
  }

  public componentDidMount(): void {
    this.loadData();
  }

  private loadData(): void {
    if (this.props.isWorkbench) {
      // get mock data in Workbench
      this.setState({
        listData: [
          {
            Title: "Test Item",
            Description: "Test description",
            ImageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/04/a8/17/f5/el-arco.jpg",
            LinkUrl: "http://www.google.com"
          },
          {
            Title: "Test Item with a Long Title",
            Description: "Test description",
            ImageUrl: "http://justcuteanimals.com/wp-content/uploads/2013/08/baby-fox-pictures-cute-animal-pics-images.jpg",
            LinkUrl: "http://www.google.com"
          },
          {
            Title: "Test Item",
            Description: "Test description",
            ImageUrl: "https://s-media-cache-ak0.pinimg.com/736x/d6/d4/d7/d6d4d7224687ca3de4a160f5264b5b99.jpg",
            LinkUrl: "Test item with a long description for display."
          }
        ]
      });
    } else {
      // get data from SharePoint
      this.request(`${this.props.siteUrl}/_api/Web/Lists(guid'${this.props.listId}')/Items?$top=${this.props.numberOfItems}`)
      .then((items: any) => {
        let listItems: IPromotedLinkDataItem[] = [];
        for (let i: number = 0; i < items.value.length; i++) {
          listItems.push({
            Title: items.value[i].Title,
            Description: items.value[i].Description,
            ImageUrl: items.value[i].BackgroundImageLocation.Url,
            LinkUrl: items.value[i].LinkLocation.Url
          });
        }
        this.setState({ listData: listItems });
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  public componentDidUpdate(prevProps: IPromotedLinksProps, prevState: IPromotedLinksState, prevContext: any) {
    if (prevProps.numberOfItems != this.props.numberOfItems
      || prevProps.listId != this.props.listId && (this.props.numberOfItems && this.props.listId)) {
        this.loadData();
    }
  }

  public render(): JSX.Element {
    return (
      <div className={styles.promotedLinks}>
        <div className={styles.container}>

          {
            this.state.listData.map((item: IPromotedLinkDataItem) => {
              return <PromotedLinkItem
                title={item.Title}
                description={item.Description}
                imageUrl={item.ImageUrl}
                href={item.LinkUrl} />;
            })
          }

          <div style={{clear:'both'}}></div>
        </div>
      </div>
    );
  }

  private request<T>(url: string, method: string = 'GET', headers: any = null, data: any = null): Promise<T> {
    return new Promise<T>((resolve, reject): void => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = function (): void {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(this.response as T);
          }
          else if (this.status >= 400) {
            reject({
              message: this.response['odata.error'].message.value,
              statusText: this.statusText,
              status: this.status
            });
          }
        }
      };

      xhr.open(method, url, true);
      if (headers === null) {
        xhr.setRequestHeader('Accept', 'application/json;odata=nometadata');
      }
      else {
        for (var header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }
      }
      xhr.responseType = 'json';
      xhr.send(data);
    });
  }
}
