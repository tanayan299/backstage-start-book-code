import { createTranslationRef } from '@backstage/core-plugin-api/alpha';

export const myPluginTranslationRef = createTranslationRef({
  id: 'plugin.my-plugin',
  messages: {
    header: {
      title: 'Welcome to my-plugin!',
      subtitle: 'Optional subtitle',
      owner: 'Owner',
      lifecycle: 'Lifecycle',
    },
    content: {
      title: 'Plugin title',
      supportButtonDescription: 'A description of your plugin goes here.',
      infoCardTitle: 'Information card',
      infoCardContent: 'All content should be wrapped in a card like this.',
    },
  },
});