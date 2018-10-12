import { schema } from 'normalizr';

export const categoriesSchema = new schema.Entity(
  'categories',
  {},
  { idAttribute: '_id' },
);
