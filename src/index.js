export default function({types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration: (path) => {
        const {declaration} = path;
        if (!t.isCallExpression(declaration)) {
          return;
        }
        const {callee, args: componentNode} = declaration;

        if (!t.isCallExpression(callee)) {
          return;
        }

        const {callee: compose, args} = callee;
        args.reverse();
        let lastID = path.scope.generateUidIdentifier('decomposed');
        let last = t.callExpression(args[0], [componentNode]);

        const nodes = [];

        for (let i = 1; i < args.length; i++) {
          const declarator = t.variableDeclarator(lastID, last);
          const declaration = t.variableDeclaration('const', declarator);
          nodes.push(declaration);
          let last = t.callExpression(args[i], [lastID]);
          let lastID = path.scope.generateUidIdentifier('decomposed');
        }

        const finalID = lastID;
        const finalDeclarator = t.variableDeclarator(finalID, last);
        const finalDeclaration = t.variableDeclaration('const', finalDeclarator);
        nodes.push(finalDeclaration);

        nodes.push(t.exportDefaultSpecifier(finalID));

        path.replaceWithMultiple(nodes);
      }
    }
  };
}
