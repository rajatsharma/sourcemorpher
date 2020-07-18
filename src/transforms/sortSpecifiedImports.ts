import { FileInfo, JSCodeshift, ImportSpecifier, ImportDefaultSpecifier, ImportNamespaceSpecifier } from 'jscodeshift';

function compareSpecifiers(
  a: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier,
  b: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier,
): number {
  if (!('imported' in a)) {
    return 1;
  }

  if (!('imported' in b)) {
    return -1;
  }

  const nameA = a.imported.name.toUpperCase();
  const nameB = b.imported.name.toUpperCase();
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
    .find(j.ImportDeclaration)
    .forEach((path) => {
      path.value.specifiers.sort(compareSpecifiers);
    })
    .toSource();
}
