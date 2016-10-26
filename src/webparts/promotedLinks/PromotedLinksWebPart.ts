import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-client-preview';
import { EnvironmentType } from '@microsoft/sp-client-base';
import * as strings from 'promotedLinksStrings';
import PromotedLinks, { IPromotedLinksProps } from './components/PromotedLinks';
import { IPromotedLinksWebPartProps } from './IPromotedLinksWebPartProps';

interface ISPList {
  Title: string;
  Id: string;
}

interface ISPLists {
  value: ISPList[];
}

export default class PromotedLinksWebPart extends BaseClientSideWebPart<IPromotedLinksWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public onInit<T>(): Promise<T> {
    this.fetchOptions()
    .then((data) => {
      this._listsInThisSite = data;
    });

    return Promise.resolve();
  }

  private _listsInThisSite: IPropertyPaneDropdownOption[] = [];

  public render(): void {
    const element: React.ReactElement<IPromotedLinksProps> = React.createElement(PromotedLinks, {
      isWorkbench: this.context.environment.type == EnvironmentType.Local ? true : false,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      numberOfItems: this.properties.numberOfItems,
      listId: this.properties.listId
    });

    ReactDom.render(element, this.domElement);
  }

  private fetchLists(url: string) : Promise<ISPLists> {
    return this.context.httpClient.get(url).then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
          return null;
        }
      });
  }

  private fetchOptions(): Promise<IPropertyPaneDropdownOption[]> {
    var url = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=BaseTemplate eq 170 and Hidden eq false`;

    return this.fetchLists(url).then((response) => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        var lists: ISPList[] = response.value;
        lists.forEach((list: ISPList) => {
            console.log("Found list with title = " + list.Title);
            options.push( { key: list.Id, text: list.Title });
        });

        return options;
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneDropdown('listId', {
                  label: strings.selectedListNameFieldLabel,
                  isDisabled: false,
                  options: this._listsInThisSite
                }),
                PropertyPaneSlider('numberOfItems', {
                  label: strings.NumberOfDocumentsFieldLabel,
                  min: 1,
                  max: 10,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
