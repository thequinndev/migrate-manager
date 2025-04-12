import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@thequinndev/migration-manager": "/src/migration-manager",
      "@examples": "/examples",
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
      },
      name: "MigrateManager",
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    coverage: {
      thresholds: {
        100: true,
      },
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**", // Ignore
        "**/dist/**", // Ignore
        "**/examples/**", // Ignore examples
        // The below are export files only
        "**/src/index.ts",
        "**/src/index.d.ts",
        // Config files only
        "index.d.ts",
        "tsup.config.ts",
        "vite.config.mts",
        // Exclude this because it has no way to be mocked in a meaningful way
        "**/src/migrate-manager/exec/index.ts",
        // This is config only
        "src/migrate-manager/config/index.ts",
        // Exclude bin
        "bin",
        "src/migrate-manager/index.ts",
      ],
    },
  },
});
