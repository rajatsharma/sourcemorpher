import { FileInfo, JSCodeshift, ObjectMethod, ObjectProperty, Property, SpreadElement, SpreadProperty } from 'jscodeshift';

function comparator(
  a: Property | ObjectProperty | SpreadElement | ObjectMethod | SpreadProperty,
  b: Property | ObjectProperty | SpreadElement | ObjectMethod | SpreadProperty,
): number {
  if (a.type === 'SpreadElement' || a.type === 'SpreadProperty') return -1;
  if (b.type === 'SpreadElement' || b.type === 'SpreadProperty') return 1;

  if (a.key.type !== 'Identifier') return 1;
  if (b.key.type !== 'Identifier') return -1;

  const nameA = a.key.name.toUpperCase();
  const nameB = a.key.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

export default function transformer(
  file: FileInfo, api: { jscodeshift: JSCodeshift },
): string {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ObjectExpression)
    .forEach((path) => {
      path.value.properties.sort(comparator);
    })
    .toSource();
}
