import { schema } from 'normalizr';

export const stateSchema = new schema.Entity(
  'state',
  {},
  { idAttribute: 'StateID' },
);

export const districtSchema = new schema.Entity(
  'district',
  {},
  { idAttribute: 'DistrictID' },
);

export const vdcSchema = new schema.Entity(
  'vdc',
  {},
  { idAttribute: 'VdcMunicipalityID' },
);

export const categoriesSchema = new schema.Entity(
  'categories',
  {},
  { idAttribute: '_id' },
);
