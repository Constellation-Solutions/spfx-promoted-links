import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'promotedLinksStrings';
import PromotedLinks, { IPromotedLinksProps } from './components/PromotedLinks';
import { IPromotedLinksWebPartProps } from './IPromotedLinksWebPartProps';

export default class PromotedLinksWebPart extends BaseClientSideWebPart<IPromotedLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IPromotedLinksProps> = React.createElement(PromotedLinks, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
