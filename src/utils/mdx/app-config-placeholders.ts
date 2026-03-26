type AppConfigPlaceholderVars = Readonly<{
  appName: string;
  appAuthor?: string;
}>;

type UnistTextNode = {
  type: string;
  value?: unknown;
  children?: UnistTextNode[];
};

function visit(node: UnistTextNode) {
  const children = node.children;
  if (!children) return;
  for (const child of children) {
    visit(child);
  }
}

/**
 * Remark plugin that replaces `{{APP_NAME}}` and `{{APP_AUTHOR}}` placeholders
 * inside text nodes during MDX compilation.
 */
export function appConfigPlaceholdersPlugin(
  vars: AppConfigPlaceholderVars
): unknown {
  const transformer = (tree: UnistTextNode) => {
    const walk = (n: UnistTextNode) => {
      if (n.type === 'text' && typeof n.value === 'string') {
        n.value = n.value
          .replaceAll('{{APP_NAME}}', vars.appName)
          .replaceAll('{{APP_AUTHOR}}', vars.appAuthor ?? vars.appName)
          .replaceAll('[APP_NAME]', vars.appName)
          .replaceAll('[APP_AUTHOR]', vars.appAuthor ?? vars.appName);
      }
      if (n.children) {
        for (const child of n.children) walk(child);
      }
    };
    walk(tree);
  };

  return transformer;
}

