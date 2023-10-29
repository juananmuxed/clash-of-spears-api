import { Order } from "sequelize";
import { DEFAULT_PAGINATION } from "../../config/data/DefaultPagination";

export const getPagination = (page?: number, rowsPerPage?:  number) => {
  const limit = rowsPerPage ?? DEFAULT_PAGINATION.SIZE;
  const offset = page ? (page - 1) * limit : (DEFAULT_PAGINATION.PAGE - 1);

  return { limit, offset };
}

export const getOrder = (sortBy: string, descending: boolean) => {
  if(!sortBy) return undefined;
  return {
    order: [
      [sortBy, (descending ? 'DESC' : 'ASC')]
    ] as Order
  }
}
