/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

// カタログエンティティーの削除を禁止するポリシー
import { createBackendModule } from '@backstage/backend-plugin-api';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import {
  PolicyDecision,
  AuthorizeResult,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

class CustomPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    if (request.permission.name === 'catalog.entity.delete') {
      return {
        result: AuthorizeResult.DENY,
      };
    }
    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}

// オーナーのみがエンティティを削除できるポリシー
// import { createBackendModule } from '@backstage/backend-plugin-api';
// import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
// import {
//   PolicyDecision,
//   AuthorizeResult,
//   isPermission,
// } from '@backstage/plugin-permission-common';
// import {
//   PermissionPolicy,
//   PolicyQuery,
// } from '@backstage/plugin-permission-node';
// import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
// import { catalogEntityDeletePermission } from '@backstage/plugin-catalog-common/alpha';
// import {
//   catalogConditions,
//   createCatalogConditionalDecision,
// } from '@backstage/plugin-catalog-backend/alpha';

// class CustomPermissionPolicy implements PermissionPolicy {
//   async handle(
//     request: PolicyQuery,
//     user?: BackstageIdentityResponse,
//   ): Promise<PolicyDecision> {
//     if (isPermission(request.permission, catalogEntityDeletePermission)) {
//       return createCatalogConditionalDecision(
//         request.permission,
//         catalogConditions.isEntityOwner({
//           claims: user?.identity.ownershipEntityRefs ?? [],
//         }),
//       );
//     }

//     return {
//       result: AuthorizeResult.ALLOW,
//     };
//   }
// }

// オーナーのみがエンティティの各種権限をもつポリシー
// import { createBackendModule } from '@backstage/backend-plugin-api';
// import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
// import {
//   PolicyDecision,
//   AuthorizeResult,
//   isResourcePermission,
// } from '@backstage/plugin-permission-common';
// import {
//   PermissionPolicy,
//   PolicyQuery,
// } from '@backstage/plugin-permission-node';
// import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
// import {
//   catalogConditions,
//   createCatalogConditionalDecision,
// } from '@backstage/plugin-catalog-backend/alpha';

// class CustomPermissionPolicy implements PermissionPolicy {
//   async handle(
//     request: PolicyQuery,
//     user?: BackstageIdentityResponse,
//   ): Promise<PolicyDecision> {
//     if (isResourcePermission(request.permission, 'catalog-entity')) {
//       return createCatalogConditionalDecision(
//         request.permission,
//         catalogConditions.isEntityOwner({
//           claims: user?.identity.ownershipEntityRefs ?? [],
//         }),
//       );
//     }

//     return {
//       result: AuthorizeResult.ALLOW,
//     };
//   }
// }

const customPermissionBackendModule = createBackendModule({
  pluginId: 'permission',
  moduleId: 'custom-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new CustomPermissionPolicy());
      },
    });
  },
});

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend/alpha'));
// backend.add(
//   import('@backstage/plugin-permission-backend-module-allow-all-policy'),
// );
backend.add(customPermissionBackendModule);

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg/alpha'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));

// テンプレートへのポリシー追加時に読み込む
// backend.add(import('@internal/backstage-plugin-permission-backend-module-new-template-policy'));
backend.start();
