export interface PagingAndSortingRes<R> {
  content: R[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
