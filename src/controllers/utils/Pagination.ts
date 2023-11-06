import { DEFAULT_PAGINATION } from "../../config/data/DefaultPagination";

const Orders = ['DESC', 'ASC'] as const;

export type OrderOption = typeof Orders[number] | undefined;

export const getPagination = (page?: number, rowsPerPage?:  number) => {
  const limit = (rowsPerPage === 0 || rowsPerPage === undefined) ? DEFAULT_PAGINATION.SIZE : rowsPerPage;
  const offset = page ? (page - 1) * limit : (DEFAULT_PAGINATION.PAGE - 1);

  return { limit, offset, page };
}

export const getOrder = (sortBy?: string, descending?: string) => {
  if(!sortBy) return undefined;
  let _descending: OrderOption | undefined = undefined;
  if (descending === 'true') _descending = 'DESC'
  if (descending === 'false') _descending = 'ASC'
  return [[ sortBy, _descending as OrderOption ] as [string, string]];
}

export const pagedResponse = <T>(
  items: { rows: T[]; count: number },
  pagination: { limit: number; offset: number; page?: number },
  order?: [string, string][]
) => {
  return {
    page: pagination.page,
    rowsPerPage: pagination.limit,
    rowsNumber: items.count,
    rows: items.rows,
    sortBy: order?.at(0)?.at(0),
    descending: order?.at(0)?.at(1),
  }
}
