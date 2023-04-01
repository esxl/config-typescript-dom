import Ajv from "ajv";
import { createRequire } from "module";

describe("tsconfig.json", () => {
  const require$ = createRequire(import.meta.url);
  const schema = require$("../schemas/tsconfig.schema.json");
  const tsconfig = require$("../tsconfig.json");

  /**
   * @see https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#schema
   */
  test("it matches the tsconfig.json schema", () => {
    const ajv = new Ajv({ schemaId: "auto" });
    // Currently, the official tsconfig.json schema is draft-04.
    ajv.addMetaSchema(require$("ajv/lib/refs/json-schema-draft-04.json"));
    const validate = ajv.compile(schema);

    expect(validate(tsconfig)).toBe(true);
  });
});
