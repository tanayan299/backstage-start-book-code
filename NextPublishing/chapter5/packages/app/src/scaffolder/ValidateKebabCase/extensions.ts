import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import {
  ValidateKebabCase,
  validateKebabCaseValidation,
} from './ValidateKebabCase/ValidateKebabCaseExtension';

export const ValidateKebabCaseFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'ValidateKebabCase',
    component: ValidateKebabCase,
    validation: validateKebabCaseValidation,
  }),
);