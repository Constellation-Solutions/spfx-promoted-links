import * as React from 'react';
import styles from './PromotedLinks.module.scss';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IPromotedLinkItemProps {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
}

export interface IPromotedLinkItemState {
  hovering: boolean;
}

export default class PromotedLinks extends React.Component<IPromotedLinkItemProps, IPromotedLinkItemState> {
  constructor(props: IPromotedLinkItemProps, state: IPromotedLinkItemState) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  public mouseOver(event): void {
    this.setState({ hovering: true });
  }

  public mouseOut(event): void {
    this.setState({ hovering: false });
  }

  public render(): React.ReactElement<IPromotedLinkItemProps> {
    return (
      <a href={this.props.href} target="_top" role="listitem"
            onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
        <div className={styles.pLinkItemWrapper}>
          <Image className={styles.pLinkItemImage} src={this.props.imageUrl} shouldFadeIn={true} imageFit={ImageFit.cover} />
          <div className={this.state.hovering ? styles.pLinkItemHoverPanelExpanded : styles.pLinkItemHoverPanel}>
            <div className={styles.pLinkItemTitle}>{this.props.title}</div>
            <div className={styles.pLinkItemDesc}>{this.props.description}</div>
          </div>
        </div>
      </a>
    );
  }
}
