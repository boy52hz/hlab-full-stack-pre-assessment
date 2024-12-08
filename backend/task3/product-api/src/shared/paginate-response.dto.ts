import { PaginateMetaDto } from './paginate-meta.dto';

export class PaginateResponseDto<T> {
  data: T[];
  meta: PaginateMetaDto;
}
