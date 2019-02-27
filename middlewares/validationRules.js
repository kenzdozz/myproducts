
const productRules = [
  {
    name: 'name',
    rule: 'required',
    message: 'Product name is required.',
  },
  {
    name: 'description',
    rule: 'required',
    message: 'Product description is required.',
  },
  {
    name: 'price',
    rule: 'required',
    message: 'Product price is required.',
  },
  {
    name: 'price',
    rule: 'number',
    message: 'Product price must be a number.',
  },
  {
    name: 'category',
    rule: 'required',
    message: 'Product category is required.',
  },
  {
    name: 'image',
    rule: 'image',
    message: 'Product image is required.',
  },
  {
    name: 'color',
    rule: 'required',
    message: 'Product color is required.',
  },
];

export {
  productRules,
};
