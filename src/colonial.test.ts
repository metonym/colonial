import { strict as test } from "assert";
import { css, sheet, style } from "./colonial";

// @ts-ignore
test.equal(css(), undefined);
test.deepEqual(style({}), {});
test.deepEqual(
  css`
    color: red;
  `,
  "c_0"
);

test.equal(sheet().length, 1);
test.equal(
  css`
    color: red;
    background-color: blue;
    border-bottom-width: 4px;
  `,
  "c_1"
);
test.equal(sheet().length, 2);
test.deepEqual(
  style({
    color: "red",
    backgroundColor: "blue",
  }),
  {
    c_2: {
      backgroundColor: "blue",
      color: "red",
    },
  }
);
test.equal(sheet().length, 3);
test.equal(css``, undefined);
test.equal(sheet().length, 3);
