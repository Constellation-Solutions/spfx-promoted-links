import * as React from 'react';
import { css, Image, IImageProps, ImageFit } from 'office-ui-fabric-react';

import styles from '../PromotedLinks.module.scss';

export interface IPromotedLinkItemProps {
  imageUrl: string;
  title: string;
  description: string;
  href: string;
}

export interface IPromotedLinkItemState {
  hovering: boolean;
}

export default class PromotedLinkItem extends React.Component<IPromotedLinkItemProps, IPromotedLinkItemState> {

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

  public render(): JSX.Element {
    return (
      <a href={this.props.href} target="_top">
        <div className={styles.pLinkItemWrapper}
            onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>
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
