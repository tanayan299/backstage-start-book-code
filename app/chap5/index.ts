/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackendModule } from "@backstage/backend-plugin-api";
import { BackstageIdentityResponse } from "@backstage/plugin-auth-node";
import {
  PolicyDecision,
  AuthorizeResult,
} from "@backstage/plugin-permission-common";
import {
  PermissionPolicy,
  PolicyQuery,
} from "@backstage/plugin-permission-node";
import { policyExtensionPoint } from "@backstage/plugin-permission-node/alpha";

class CustomPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse
  ): Promise<PolicyDecision> {
    if (request.permission.name === "catalog.entity.create") {
      return {
        result: AuthorizeResult.DENY,
      };
    }
    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}

// === catalogEntityDeletePermission by User ===
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

// === catalog-entity  ===
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
  pluginId: "permission",
  moduleId: "custom-policy",
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new CustomPermissionPolicy());
      },
    });
  },
});

import { createBackend } from "@backstage/backend-defaults";

const backend = createBackend();

backend.add(import("@backstage/plugin-app-backend/alpha"));
backend.add(import("@backstage/plugin-proxy-backend/alpha"));
backend.add(import("@backstage/plugin-scaffolder-backend/alpha"));
backend.add(import("@backstage/plugin-techdocs-backend/alpha"));

backend.add(import("@backstage/plugin-scaffolder-backend-module-github"));

// auth plugin
backend.add(import("@backstage/plugin-auth-backend"));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import("@backstage/plugin-auth-backend-module-guest-provider"));
// See https://github.com/backstage/backstage/blob/master/docs/auth/guest/provider.md
backend.add(import("@backstage/plugin-auth-backend-module-github-provider"));
backend.add(import("@backstage/plugin-auth-backend-module-microsoft-provider"));

// catalog plugin
backend.add(import("@backstage/plugin-catalog-backend/alpha"));
backend.add(
  import("@backstage/plugin-catalog-backend-module-scaffolder-entity-model")
);
backend.add(import("@backstage/plugin-catalog-backend-module-github/alpha"));
backend.add(import("@backstage/plugin-catalog-backend-module-github-org"));
backend.add(import("@backstage/plugin-kubernetes-backend/alpha"));

// permission plugin
backend.add(import("@backstage/plugin-permission-backend/alpha"));
// backend.add(
//   import('@backstage/plugin-permission-backend-module-allow-all-policy'),
// );
backend.add(customPermissionBackendModule);

// search plugin
backend.add(import("@backstage/plugin-search-backend/alpha"));
backend.add(import("@backstage/plugin-search-backend-module-catalog/alpha"));
backend.add(import("@backstage/plugin-search-backend-module-techdocs/alpha"));

backend.start();
