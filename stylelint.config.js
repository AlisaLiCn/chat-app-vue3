export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'function',
          'apply',
          'variants',
          'responsive',
          'screen',
          'if',
          'each',
          'include',
          'mixin',
          'for',
          'extend',
          'content'
        ]
      }
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['PingFang SC', 'PingFangSC-Regular']
      }
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$',
      {
        message: selector => `Expected class selector "${selector}" to be kebab-case`
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep', 'slotted']
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml']
}
