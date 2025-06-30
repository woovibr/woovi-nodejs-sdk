import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      source: {
        entry: {
          index: './src/index.ts',
        },
      },
      format: 'esm',
      syntax: ['node 22'],
      dts: true
    },
    {
      format: 'cjs',
      syntax: ['node 22'],
    },
  ],
});
