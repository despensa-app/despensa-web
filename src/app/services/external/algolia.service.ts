import {Injectable} from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import {environment} from '../../../environments/environment';
import instantsearch, {IndexWidget, Widget} from 'instantsearch.js';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  private readonly searchClient = algoliasearch(environment.APP_ID_ALGOLIA, environment.API_KEY_ALGOLIA);

  private readonly productsInstantSearch;

  constructor() {
    const productsOptions = {
      indexName: environment.PRODUCTS_INDEX_NAME_ALGOLIA,
      searchClient: this.searchClient,
      future: {
        preserveSharedStateOnUnmount: false
      }
    };
    this.productsInstantSearch = instantsearch(productsOptions);
  }

  productsAddWidgets(widgets: Array<IndexWidget | Widget>) {
    this.productsInstantSearch.addWidgets(widgets);
  }

  productStart() {
    this.productsInstantSearch.start();
  }

  productDispose() {
    this.productsInstantSearch.dispose();
  }
}
