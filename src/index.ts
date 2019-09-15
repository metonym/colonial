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

  const part: string[] = [split[0]];

  for (let i = 1, len = split.length; i < len; ) {
    const s = split[i].split('');
    s[0] = s[0].toUpperCase();
    part.push(s.join(''));
    i += 1;
  }

  return part.join('');
};

// TODO: add guaranteed type
interface IObject {
  key: undefined | string;
  rule: {} | IStyleSheetRule;
}

const toObject = (text: string) => {
  const fragments = text.split('\n').filter(i => i.trim().length);

  if (fragments.length === 0) {
    return { key: undefined, rule: {} };
  }

  const cssRules: IStyleSheetRule = {};

  fragments
    .map(i => i.replace(/\s+|;/g, ''))
    .forEach(item => {
      const [left, value] = item.split(':');
      cssRules[toProperty(left)] = value;
    });

  const key = generateKey();
  const obj: IObject = { key, rule: { [key]: cssRules } };

  return obj;
};

interface IRulesByIndex {
  [key: string]: number;
}

const rules: IStyleSheetRule[] = [];
const rulesByIndex: IRulesByIndex = {};

const createRule = (prop: string | IObject) => {
  const obj = typeof prop === 'string' ? toObject(prop) : prop;

  if (obj.key) {
    rules.push(obj.rule);
    rulesByIndex[obj.key] = rules.length;
  }

  return obj;
};

const generateKey = () => {
  // TODO: prefix
  const key = `_${rules.length}`;

  return key;
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

  const key = generateKey();
  const obj: IObject = { key, rule: { [key]: args } };

  return createRule(obj).rule;
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
