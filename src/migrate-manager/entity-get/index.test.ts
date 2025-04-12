import { vi } from "vitest";
import * as fs from "fs";
import { runCmdAndGetString } from "../exec";
import { entityGet } from "./index";
vi.mock("fs");
vi.mock("../exec", () => ({
  runCmdAndGetString: vi.fn(),
}));

describe("entityGet", () => {
  it("Gets the command", () => {
    const result = entityGet({
      cmd: ["Mock", "Mock2"],
    });

    expect(result).toEqual("Mock\n\nMock2");
  });

  it("Gets the git entity", () => {
    (runCmdAndGetString as ReturnType<typeof vi.fn>).mockReturnValue("Mock");

    const result = entityGet({
      file: {
        fileName: "mock.txt",
        ref: "ref",
      },
    });

    expect(result).toEqual("Mock");
  });

  it("Gets the file entities", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue("Mock");

    const result = entityGet({
      file: {
        fileName: "mock.txt",
        ref: null,
      },
    });

    expect(result).toEqual("Mock");
  });

  it("Gets the pre and post", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue("Mock");

    const result = entityGet({
      pre: ["Pre"],
      file: {
        fileName: "mock.txt",
        ref: null,
      },
      post: ["Post"],
    });

    expect(result).toEqual("Pre\n\nMock\n\nPost");
  });
});
