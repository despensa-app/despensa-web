import {Injectable} from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import {environment} from '../../environments/environment';
import instantsearch from 'instantsearch.js';
import {connectHits, connectSearchBox} from 'instantsearch.js/es/connectors';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  private readonly searchClient = algoliasearch(environment.APP_ID_ALGOLIA, environment.API_KEY_ALGOLIA);

  private readonly productsOptions;

  constructor() {
    this.productsOptions = {
      indexName: environment.PRODUCTS_INDEX_NAME_ALGOLIA,
      searchClient: this.searchClient,
      future: {
        preserveSharedStateOnUnmount: false
      }
    };
  }

  productsStartSearch(param: {
    hits: (renderOptions: any, isFirstRender: any) => void;
    searchBox: (renderOptions: any, isFirstRender: any) => void
  }) {
    const instantSearch = instantsearch(this.productsOptions);
    const customSearchBox = connectSearchBox(param.searchBox);
    const customHits = connectHits(param.hits);

    instantSearch.addWidgets([
      customHits({}),
      customSearchBox({})
    ]);
    instantSearch.start();
  }
}
