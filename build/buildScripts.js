/* eslint-disable */

import typescript from 'rollup-plugin-typescript2'

// ------------------------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------------------------
const pkg = require('../packages/scripts/package.json')
const name = pkg.name
const className = name.replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase())
const external = Object.keys(pkg.dependencies || [])
const plugins = [
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'packages/scripts/dist/types/',
      },
      include: ['packages/scripts/src/**/*'],
      exclude: ['packages/scripts/test/**/*'],
    },
  }),
]

// ------------------------------------------------------------------------------------------
// Builds
// ------------------------------------------------------------------------------------------
function defaults(config) {
  // defaults
  const defaults = {
    plugins,
    external,
  }
  // defaults.output
  config.output = config.output.map((output) => {
    return Object.assign(
      {
        sourcemap: false,
        name: className,
        exports: 'named',
      },
      output
    )
  })
  return Object.assign(defaults, config)
}

export default [
  defaults({
    input: 'packages/scripts/src/index.ts',
    output: [{ file: 'packages/scripts/dist/index.esm.js', format: 'esm' }],
  }),
]
