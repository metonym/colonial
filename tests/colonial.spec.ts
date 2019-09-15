import { css, sheet, style } from '../src';

describe('colonial', () => {
  test('css, sheet, style', () => {
    // @ts-ignore
    expect(css()).toBeUndefined();

    // @ts-ignore
    expect(style({})).toEqual({});

    expect(
      css`
        color: red;
      `
    ).toEqual(expect.any(String));
    expect(sheet().length).toEqual(1);

    expect(
      css`
        color: red;
        background-color: blue;
      `
    ).toEqual(expect.any(String));
    expect(sheet().length).toEqual(2);

    expect(
      style({
        color: 'red',
        backgroundColor: 'blue'
      })
    ).toEqual(expect.any(Object));
    expect(sheet().length).toEqual(3);

    expect(css``).toBeUndefined();
    expect(sheet().length).toEqual(3);
    expect(sheet()).toMatchSnapshot();
  });
});
