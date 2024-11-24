import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  PolicyDecision,
  AuthorizeResult,
  isPermission,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
  PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import {
  templateParameterReadPermission,
  templateStepReadPermission,
} from '@backstage/plugin-scaffolder-common/alpha';
import {
  createScaffolderTemplateConditionalDecision,
  scaffolderTemplateConditions,
} from '@backstage/plugin-scaffolder-backend/alpha';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

class ExamplePermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: PolicyQueryUser,
  ): Promise<PolicyDecision> {
    if (
      isPermission(request.permission, templateParameterReadPermission) ||
      isPermission(request.permission, templateStepReadPermission)
    ) {
      if (user?.info.userEntityRef === 'user:development/guest')
        return createScaffolderTemplateConditionalDecision(request.permission, {
          not: scaffolderTemplateConditions.hasTag({ tag: 'secret' }),
        });
    }

    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}

export const permissionModuleNewTemplatePolicy = createBackendModule({
  pluginId: 'permission',
  moduleId: 'new-template-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new ExamplePermissionPolicy());
      },
    });
  },
});