import { beforeEach, jest } from "@jest/globals";

jest.unstable_mockModule("../services/fileService.js", () => ({
  readJSON: jest.fn(),
  writeJSON: jest.fn(),
}));

const fileService = await import("../services/fileService.js");
const { getFields, createFields } = await import(
  "../controllers/fieldsController.js"
);

describe("fieldsController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getFields responde con los campos correspondientes", () => {
    const mockFields = [{ id: 1, name: "Campo 1" }];

    fileService.readJSON.mockReturnValue(mockFields);

    const req = {};
    const res = { json: jest.fn() };
    getFields(req, res);

    expect(fileService.readJSON).toHaveBeenCalledWith("./data/fields.json");
    expect(res.json).toHaveBeenCalledWith(mockFields);
  });

  test("createFields agrega un nuevo campo", () => {
    const existingFields = [{ id: 1, name: "Campo 1" }];
    const newField = [{ id: 2, name: "Campo 2" }];

    const fieldsClone = [...existingFields];

    fileService.readJSON.mockReturnValue(fieldsClone);
    fileService.writeJSON.mockImplementation(() => {});

    const req = { body: newField };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    createFields(req, res);

    expect(fileService.readJSON).toHaveBeenCalledWith("./data/fields.json");
    expect(res.json).toHaveBeenCalledWith(newField);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
