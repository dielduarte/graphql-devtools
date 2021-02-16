import { PreferencesEnum } from './_types';

export const isPreserveLogs = (context: CoreContext) => {
  return context.settings.preferences[PreferencesEnum.preserveLog] ?? false;
};
