import {
    ScmIntegrationsApi,
    scmIntegrationsApiRef,
    ScmAuth,
  } from '@backstage/integration-react';
  import {
    AnyApiFactory,
    configApiRef,
    createApiFactory,
    identityApiRef, // 追記
    storageApiRef, // 追記
  } from '@backstage/core-plugin-api';
  // 追記
  import { VisitsStorageApi, visitsApiRef } from '@backstage/plugin-home';
  
  export const apis: AnyApiFactory[] = [
    createApiFactory({
      api: scmIntegrationsApiRef,
      deps: { configApi: configApiRef },
      factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
    }),
    ScmAuth.createDefaultApiFactory(),
  
    // 追記
    // Implementation that relies on a provided storageApi
    createApiFactory({
      api: visitsApiRef,
      deps: {
        storageApi: storageApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ storageApi, identityApi }) =>
        VisitsStorageApi.create({ storageApi, identityApi }),
    }),
  ];
  