import {
  parseMigrationManagerConfig,
  parseChangesetConfig,
} from "./migration-manager.config";

describe("parseMigrationManagerConfig", () => {
  it("will parse", () => {
    expect(parseMigrationManagerConfig({})).toEqual({
      migrationGroups: [],
      migrationGroupsDir: "docolate-migrate",
      outputDir: "migrations",
      prefixStrategy: "timestamp",
      splitBy: {
        none: {
          downFileFormat: "{{prefix}}.down.sql",
          upFileFormat: "{{prefix}}.up.sql",
        },
      },
    });
  });
});

describe("parseChangesetConfig", () => {
  it("will parse", () => {
    expect(
      parseChangesetConfig({
        upRef: "ref",
        description: "Mock",
        changeItemGroups: [
          {
            groupName: "mock",
            changeItems: [
              {
                description: "Mock",
                up: {
                  pre: ["mock"],
                  post: ["mock"],
                  cmd: ["test"],
                },
                down: {
                  pre: ["mock"],
                  post: ["mock"],
                  cmd: ["test"],
                },
              },
            ],
          },
        ],
      }),
    ).toEqual({
      upRef: "ref",
      description: "Mock",
      changeItemGroups: [
        {
          groupName: "mock",
          changeItems: [
            {
              description: "Mock",
              up: {
                pre: ["mock"],
                post: ["mock"],
                cmd: ["test"],
              },
              down: {
                pre: ["mock"],
                post: ["mock"],
                cmd: ["test"],
              },
            },
          ],
        },
      ],
    });
  });
});
