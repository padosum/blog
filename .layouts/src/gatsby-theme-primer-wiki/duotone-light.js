const colors = {
  char: '#D8DEE9',
  comment: '#999999',
  keyword: '#c5a5c5',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#0ac266',
  boolean: '#ff8b50',
  punctuation: '#5FB3B3',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
}
const theme = {
  plain: {
    backgroundColor: '#fbfdfc',
    color: '#2c293d',
  },
  styles: [
    {
      types: ['attr-name'],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ['attr-value'],
      style: {
        color: colors.string,
      },
    },
    {
      types: [
        'comment',
        'block-comment',
        'prolog',
        'doctype',
        'cdata',
        'shebang',
      ],
      style: {
        color: colors.comment,
      },
    },
    {
      types: [
        'property',
        'number',
        'function-name',
        'constant',
        'symbol',
        'deleted',
      ],
      style: {
        color: colors.primitive,
      },
    },
    {
      types: ['boolean'],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ['tag'],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ['string'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['selector', 'char', 'builtin', 'inserted'],
      style: {
        color: colors.char,
      },
    },
    {
      types: ['function'],
      style: {
        color: colors.function,
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ['atrule', 'class-name'],
      style: {
        color: colors.className,
      },
    },
    {
      types: ['important'],
      style: {
        fontWeight: '400',
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
}
export default theme