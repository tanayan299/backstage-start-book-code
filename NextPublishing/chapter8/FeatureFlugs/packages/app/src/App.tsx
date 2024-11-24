import React from 'react';
import { Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
  SignInProviderConfig,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { githubAuthApiRef } from '@backstage/core-plugin-api';

import { HomepageCompositionRoot, VisitListener } from '@backstage/plugin-home';
import { HomePage } from './components/home/HomePage';

// 5.10 テンプレートの拡張
// import { ValidateKebabCaseFieldExtension } from './scaffolder/ValidateKebabCase';
// import { ScaffolderFieldExtensions } from '@backstage/plugin-scaffolder-react';

import { MyPluginPage } from '@internal/backstage-plugin-my-plugin';

const githubProvider: SignInProviderConfig = {
  id: 'github-auth-provider',
  title: 'GitHub',
  message: 'Sign in using GitHub',
  apiRef: githubAuthApiRef,
};

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage {...props} auto providers={['guest', githubProvider]} />
    ),
  },

  // App.tsxにおけるFeature Flagsの定義
  // featureFlags: [
  //   {
  //     // pluginId is required for feature flags used in plugins.
  //     // pluginId can be left blank for a feature flag used in the application and not in plugins.
  //     pluginId: 'my-plugin',
  //     name: 'enable-my-plugin',
  //     description: 'Enables My Plugin feature!!',
  //   },
  // ],
});

const routes = (
  <FlatRoutes>
    {/* <Route path="/" element={<Navigate to="catalog" />} /> */}
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    {/* 5.10 テンプレートの拡張
    <Route path="/create" element={<ScaffolderPage />}>
      <ScaffolderFieldExtensions>
        <ValidateKebabCaseFieldExtension />
      </ScaffolderFieldExtensions>
    </Route> */}
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/my-plugin" element={<MyPluginPage />} />
    {/* App.tsxにおけるFeature Flagsコンポーネントの使用 */}
    {/* <Route
      path="/my-plugin"
      element={
        <>
          <FeatureFlagged with="enable-my-plugin">
            <MyPluginPage />
          </FeatureFlagged>
          <FeatureFlagged without="enable-my-plugin">
            <div>My Plugin is currently disabled</div>
          </FeatureFlagged>
        </>
      }
    /> */}
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <VisitListener />
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);