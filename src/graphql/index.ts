import { join } from 'node:path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

const loadedTypeDefs = loadFilesSync([
  join(process.cwd(), 'src/graphql/**/*.graphql'),
  join(process.cwd(), 'src/modules/**/*.graphql'),
])

const loadedResolvers = loadFilesSync(join(process.cwd(), 'src/modules/**/resolver/*Resolver.ts'), {
  exportNames: ['resolvers'],
})

export const typeDefs = mergeTypeDefs(loadedTypeDefs)

export const resolvers = mergeResolvers(loadedResolvers)
