import {PagingAndSortingReq} from '@app/models/paging-and-sorting-req';

export interface FindByIdProductListReq extends PagingAndSortingReq {
  selected: string;
}
