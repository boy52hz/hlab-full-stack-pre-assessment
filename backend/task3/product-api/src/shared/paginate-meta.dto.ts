import { PaginateParams } from './get-paginate-params';

export class PaginateMetaDto {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;

  constructor({ page, limit }: PaginateParams, totalItems: number) {
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / limit) || 1;
  }
}
