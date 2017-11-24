export default function({types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration: (path) => {
        
        const {declaration: visitee} = path.node;

        if (!t.isCallExpression(visitee)) {
          return;
        }
        
        const {callee, arguments: componentNode} = visitee;

        if (!t.isCallExpression(callee)) {
          return;
        }

        const {callee: compose, arguments: args} = callee;
        args.reverse();
        
        let lastValID = path.scope.generateUidIdentifier('decomposed');
        let declarator = t.variableDeclarator(lastValID, componentNode[0]);
        let declaration = t.variableDeclaration('const', [declarator]);
        const nodes = [
          declaration
        ];

        for (let i = 0; i < args.length; i++) {
          // compose func
          const funcID = path.scope.generateUidIdentifier('decomposed');
          declarator = t.variableDeclarator(funcID, args[i]);
          declaration = t.variableDeclaration('const', [declarator]);

          // push func
          nodes.push(declaration);

          // compose val
          const temp = t.callExpression(funcID, [lastValID]);
          lastValID = path.scope.generateUidIdentifier('decomposed');
          declarator = t.variableDeclarator(lastValID, temp);
          declaration = t.variableDeclaration('const', [declarator]);

          // push val
          nodes.push(declaration);
        }

        nodes.push(t.exportDefaultDeclaration(lastValID));

        path.replaceWithMultiple(nodes);
      }
    }
  };
}
