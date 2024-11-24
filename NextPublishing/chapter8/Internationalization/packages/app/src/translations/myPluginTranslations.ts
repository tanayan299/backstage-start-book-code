import { createTranslationResource } from '@backstage/core-plugin-api/alpha';
import { myPluginTranslationRef } from '@internal/backstage-plugin-my-plugin';

export const japaneseMyPluginMessages = createTranslationResource({
  ref: myPluginTranslationRef,
  translations: {
    ja: () =>
      Promise.resolve({
        default: {
          'header.title': 'my-pluginへようこそ！',
          'header.subtitle': 'オプションのサブタイトル',
          'header.owner': 'オーナー',
          'header.lifecycle': 'ライフサイクル',
          'content.title': 'プラグインタイトル',
          'content.supportButtonDescription':
            'ここにプラグインの説明が入ります。',
          'content.infoCardTitle': '情報カード',
          'content.infoCardContent':
            'すべてのコンテンツはこのようなカードでラップされるべきです。',
        },
      }),
  },
});