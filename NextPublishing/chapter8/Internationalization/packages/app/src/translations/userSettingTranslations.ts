import { createTranslationResource } from '@backstage/core-plugin-api/alpha';
import { userSettingsTranslationRef } from '@backstage/plugin-user-settings/alpha';

export const userSettingsMessages = createTranslationResource({
  ref: userSettingsTranslationRef,
  translations: {
    ja: () =>
      Promise.resolve({
        default: {
          'languageToggle.title': '言語',
          'languageToggle.select': '{{language}}を選択',
          'languageToggle.description': '言語を切り替える',
          'themeToggle.title': 'テーマ',
          'themeToggle.description': 'テーマを切り替える',
          'themeToggle.select': '{{theme}}を選択',
          'themeToggle.selectAuto': '自動テーマを選択',
          'themeToggle.names.auto': '自動',
          'themeToggle.names.dark': 'ダーク',
          'themeToggle.names.light': 'ライト',
        },
      }),
    zh: () =>
      Promise.resolve({
        default: {
          'languageToggle.title': 'XX',
          'languageToggle.select': 'XX{{language}}',
          'languageToggle.description': 'XX',
          'themeToggle.title': 'XX',
          'themeToggle.description': 'XX',
          'themeToggle.select': 'XX{{theme}}',
          'themeToggle.selectAuto': 'XX',
          'themeToggle.names.auto': 'XX',
          'themeToggle.names.dark': 'XX',
          'themeToggle.names.light': 'XX',
        },
      }),
  },
});