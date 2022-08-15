import Ajv from "ajv";
import { inspect } from "util";

const ajv = new Ajv({ allErrors: true });

export const validatorFactory = (schema) => {
  const validate = ajv.compile(schema);

  const verify = (data) => {
    const isValid = validate(data);
    if (isValid) {
      return data;
    }
    throw new Error(
      ajv.errorsText(
        validateAuthData.errors?.filter((err) => err.keyword !== "if"),
        { dataVar: "schema" } + "\n\n" + inspect(data)
      )
    );
  };

  return { schema, verify };
};
