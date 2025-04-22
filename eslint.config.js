import globals from 'globals'
import pluginJs from '@eslint/js' // JavaScript 规则
import pluginVue from 'eslint-plugin-vue' // Vue 规则
import pluginTypeScript from '@typescript-eslint/eslint-plugin' // TypeScript 规则

import parserVue from 'vue-eslint-parser' // Vue 解析器
import parserTypeScript from '@typescript-eslint/parser' // TypeScript 解析器

import configPrettier from 'eslint-config-prettier' // 禁用与 Prettier 冲突的规则
import pluginPrettier from 'eslint-plugin-prettier' // 运行 Prettier 规则

export default [
  // 指定检查文件和忽略文件
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    ignores: ['**/*.d.ts']
  },
  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: { prettier: pluginPrettier },
    rules: {
      ...configPrettier.rules, // 关闭与 Prettier 冲突的规则
      ...pluginPrettier.configs.recommended.rules, // 启用 Prettier 规则
      'prettier/prettier': 'error', // 强制 Prettier 格式化
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略参数名以 _ 开头的参数未使用警告
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  // JavaScript 配置
  pluginJs.configs.recommended,

  // TypeScript 配置
  {
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts'], // 排除d.ts文件
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: { '@typescript-eslint': pluginTypeScript },
    rules: {
      ...pluginTypeScript.configs.strict.rules, // TypeScript 严格规则
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-empty-object-type': 'off' // 允许空对象类型
    }
  },

  // Vue 配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        sourceType: 'module'
      }
    },
    plugins: { vue: pluginVue, '@typescript-eslint': pluginTypeScript },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules, // Vue3 推荐规则
      'vue/no-v-html': 'off' // 允许 v-html
    }
  }
]
