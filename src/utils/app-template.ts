type AppTemplateVars = Readonly<{
  APP_NAME: string;
  APP_AUTHOR?: string;
}>;

export function applyAppTemplate(
  input: string,
  vars: AppTemplateVars
): string {
  return input
    .replaceAll('{{APP_NAME}}', vars.APP_NAME)
    .replaceAll('{{APP_AUTHOR}}', vars.APP_AUTHOR ?? '');
}

