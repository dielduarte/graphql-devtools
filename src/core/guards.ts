import { PreferencesEnum } from './_types';

export const isPreserveLogs = (context: CoreContext) => {
  console.log(
    context.settings.preferences[PreferencesEnum.preserveLog] ?? false,
  );

  return context.settings.preferences[PreferencesEnum.preserveLog] ?? false;
};
