import * as React from 'react';
import styles from './PromotedLinks.module.scss';
import { IPromotedLinksProps, IPromotedLinkDataItem } from './IPromotedLinksProps';
import PromotedLinkItem, { IPromotedLinkItemProps }  from './PromotedLinkItem';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IPromotedLinksState {
  listData: IPromotedLinkDataItem[];
}

export default class PromotedLinks extends React.Component<IPromotedLinksProps, IPromotedLinksState> {

  constructor(props: IPromotedLinksProps, state: IPromotedLinksState) {
    super(props);

    this.state = { listData: [] };
  }

  public render(): React.ReactElement<IPromotedLinksProps> {
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
            ImageUrl: "https://pgcpsmess.files.wordpress.com/2014/04/330277-red-fox-kelly-lyon-760x506.jpg",
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
      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/Web/Lists(guid'${this.props.listId}')/Items?$top=${this.props.numberOfItems}`, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then((items: any) => {
        const listItems: IPromotedLinkDataItem[] = [];
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
}
