# colonial

> Old fashioned CSS-in-JS.

## Getting Started

```bash
yarn add colonial
```

## Usage

Pass a template string literal to the `css` function.

Pass an object to the `style` function.

```js
import { css, style } from 'colonial';

const h1 = css`
  font-size: 2rem;
`;

const h2 = style({
  fontSize: '1.5rem'
});
```

## License

[MIT](LICENSE)
