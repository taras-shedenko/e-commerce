import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ProductSpecs', async: false })
export class ProductSpecs implements ValidatorConstraintInterface {
  validate(specs: Record<string, string>) {
    return Object.keys(specs).every((spec) => acceptedSpecs.includes(spec));
  }

  defaultMessage() {
    return 'Product specs must be a valid object with supported specs';
  }
}

const acceptedSpecs = [
  'ram',
  'processor',
  'ssd',
  'hdd',
  'brand',
  'model',
  'color',
  'weight',
  'dimensions',
  'material',
  'capacity',
  'power',
  'voltage',
  'warranty',
  'condition',
  'chip',
  'year',
  'other_features',
];
