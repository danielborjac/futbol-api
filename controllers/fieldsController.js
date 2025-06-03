
import { readJSON, writeJSON } from "../services/fileService.js";

// import FIELDS_FILE from "../data/fields.json";
const FIELDS_FILE = "./data/fields.json"

export const getFields = (req, res) => {
  const fields = readJSON(FIELDS_FILE);
  res.json(fields);
};

export const createFields = (req, res) => {
  const fields = readJSON(FIELDS_FILE);
  const newField = req.body;
  fields.push(newField);
  writeJSON(FIELDS_FILE, fields);
  res.status(201).json(newField);
};
