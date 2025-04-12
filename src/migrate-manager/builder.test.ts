import { vi } from "vitest";
import * as fs from "fs";
import { buildChangeSet } from "./builder";
import { entityGet } from "./entity-get";
vi.mock("fs");
vi.mock("./entity-get", () => ({
  entityGet: vi.fn(),
}));

describe("buildChangeSet", () => {
  it("Builds the changeset - by none", () => {
    (entityGet as ReturnType<typeof vi.fn>).mockReturnValue("Mock");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    vi.spyOn(fs, "writeFileSync");
    buildChangeSet(
      {
        prefixStrategy: "date",
        migrationGroups: [
          {
            prefix: "mock",
          },
        ],
        outputDir: "mock",
        migrationGroupsDir: "mock",
        splitBy: {
          none: {
            upFileFormat: "{{prefix}}.up.sql",
            downFileFormat: "{{prefix}}.down.sql",
          },
        },
      },
      {
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
      },
      "mock",
      "mock",
    );

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(2);
  });

  it("Builds the changeset - by group", () => {
    (entityGet as ReturnType<typeof vi.fn>).mockReturnValue("Mock");
    const writeFileSyncSpy = vi.spyOn(fs, "writeFileSync");
    vi.spyOn(fs, "writeFileSync");
    buildChangeSet(
      {
        prefixStrategy: "date",
        migrationGroups: [
          {
            prefix: "mock",
          },
        ],
        outputDir: "mock",
        migrationGroupsDir: "mock",
        splitBy: {
          group: {
            upFileFormat: "{{prefix}}_{{increment}}_{{groupName}}/up.sql",
            downFileFormat: "{{prefix}}_{{increment}}_{{groupName}}/down.sql",
          },
        },
      },
      {
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
      },
      "mock",
      "mock",
    );

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(4);
  });
});
