import { FilterQuery, Query, Types } from 'mongoose';
import AppError from '../errors/AppError';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const authorId = this?.query?.filter as string;
    if (authorId) {
      this.modelQuery = this.modelQuery.find({
        author: authorId,
      } as FilterQuery<T>);
    }
    return this;
  }

  sort() {
    const sortByField = (this.query.sortBy as string) || '-createdAt';
    const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortByField}`);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;
