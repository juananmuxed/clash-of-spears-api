import { DEFAULT_PAGINATION } from "../../config/data/DefaultPagination";

const Orders = ['DESC', 'ASC'] as const;

export type OrderOption = typeof Orders[number] | undefined;

export const getPagination = (page?: number, rowsPerPage?:  number) => {
  const limit = (rowsPerPage === 0 || rowsPerPage === undefined) ? DEFAULT_PAGINATION.SIZE : rowsPerPage;
  const offset = page ? (page - 1) * limit : (DEFAULT_PAGINATION.PAGE - 1);

  return { limit, offset, page };
}

export const getOrder = (sortBy?: string, descending?: string) => {
  let _descending: OrderOption | undefined = undefined;
  if (descending === 'true') _descending = 'DESC'
  if (descending === 'false') _descending = 'ASC'
  return { sortBy, descending: _descending as OrderOption }
}
