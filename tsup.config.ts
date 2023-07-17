import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/cli.ts'],
    target: 'node20',
    format: 'esm',
    minify: true,
    minifyIdentifiers: true
})