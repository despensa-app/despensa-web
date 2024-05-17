import {PagingAndSortingRes} from './paging-and-sorting-res';

export interface FindAllUnitTypesRes extends PagingAndSortingRes<UnitType> {

}

export interface UnitType {
  id: number;
  name: string;
}
