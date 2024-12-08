import { PaginateQueryDto } from './paginate-query.dto';

export type PaginateParams = {
  page: number;
  limit: number;
  skip: number;
  take: number;
  q: string;
};

export function getPaginateParams(query: PaginateQueryDto) {
  const page = query?.page || 1;
  const limit = query?.limit || 10;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
    q: query.q,
  };
}
