// schema: src/server/typeDefs/**/*.ts
// generates:
//   src/generated/graphql.ts:
//     config:
//       namingConvention:
//         enumValues: change-case#upperCase
//       useIndexSignature: true
//     plugins:
//       - '@graphql-codegen/typescript'
//       - '@graphql-codegen/typescript-resolvers'

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'server/src/typeDefs/**/*.ts',
  generates: {
    './server/generated/gql.ts': {
      config: {
        namingConvention: {
          enumValues: 'change-case#upperCase',
        },
      },
      plugins: ['@graphql-codegen/typescript', '@graphql-codegen/typescript-resolvers'],
    },
  },
};

export default config;
