import {
    createPlugin,
    createRoutableExtension,
  } from '@backstage/core-plugin-api';
  
  import { rootRouteRef } from './routes';
  
  export const myPluginPlugin = createPlugin({
    id: 'my-plugin',
    routes: {
      root: rootRouteRef,
    },
    // Feature Flagの定義
    featureFlags: [
      {
        name: 'enable-my-plugin',
      },
    ],
  });
  
  export const MyPluginPage = myPluginPlugin.provide(
    createRoutableExtension({
      name: 'MyPluginPage',
      component: () =>
        import('./components/ExampleComponent').then(m => m.ExampleComponent),
      mountPoint: rootRouteRef,
    }),
  );
  