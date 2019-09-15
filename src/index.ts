// TODO: call "rule" "styleObject"

type CSSRules = Partial<CSSStyleDeclaration>;

interface IStyleSheetRule {
  [selector: string]: CSSRules;
}

const toProperty = (fragment: string) => {
  const split = fragment.split('-');

  if (split.length <= 1) {
    return fragment;
  }

  return split
    .map((item, i) => {
      if (i === 0) {
        return item;
      }

      const s = item.split('');
      s[0] = s[0].toUpperCase();

      return s.join('');
    })
    .join('');
};

const toObject = (text: string) => {
  const fragments = text.split('\n').filter(i => i.trim().length);

  const obj: { key: undefined | string; rule: {} | IStyleSheetRule } = {
    key: undefined,
    rule: {}
  };

  if (fragments.length === 0) {
    return obj;
  }

  const cssRules: CSSRules = {};

  text
    .split('\n')
    .filter(i => i.trim().length)
    .forEach(item => {
      const [left, right] = item.split(':');
      const property = toProperty(left).trim();
      const value = right.replace(';', '').trim();
      cssRules[property as any] = value;
    });

  // TODO: generate key
  const key = `_${rules.length}`;

  // TODO: append prefix
  obj.key = `_${rules.length}`;
  obj.rule = { [key]: cssRules };

  return obj;
};

interface IRulesByIndex {
  [key: string]: number;
}

const rules: IStyleSheetRule[] = [];
const rulesByIndex: IRulesByIndex = {};

const createRule = (text: string) => {
  const obj = toObject(text);

  if (obj.key) {
    rules.push(obj.rule);
    rulesByIndex[obj.key] = rules.length;
  }

  return obj;
};

type Css = (args: TemplateStringsArray) => undefined | string;
type Style = (args: CSSRules) => IStyleSheetRule;

const css: Css = args => {
  if (Array.isArray(args)) {
    return createRule(args[0]).key;
  }

  return undefined;
};

const style: Style = args => {
  if (Object.keys(args).length === 0) {
    return {};
  }

  const obj: { key: undefined | string; rule: {} | IStyleSheetRule } = {
    key: undefined,
    rule: {}
  };
  // TODO: Reuse create key

  // TODO: generate key
  const key = `_${rules.length}`;

  // TODO: append prefix
  obj.key = `_${rules.length}`;
  obj.rule = { [key]: args };

  // if (obj.key) {
  rules.push(obj.rule);
  rulesByIndex[obj.key] = rules.length;
  // }

  return obj.rule;
};

const sheet = () => rules;

interface IColonial {
  css: Css;
  style: Style;
  sheet: () => IStyleSheetRule[];
}

const colonial: IColonial = { css, style, sheet };

export default colonial;
export { css, style, sheet };
