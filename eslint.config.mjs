import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
    js.configs.recommended, // Standart JS qoidalarini yuklash
    {
        files: ['{src,apps,libs,test}/**/*.ts'], // Lint qilinadigan fayllarni belgilash
        ignores: ['node_modules/**', 'dist/**', 'eslint.config.mjs', 'src/database/**' , 'src/common/swagger/**' , 'src/main.ts'], // Ignored fayllar
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jest,
                ...globals.mocha,
                ...globals['jest/globals'],
                Express: 'readonly',
                NodeJS: 'readonly',
                module: 'readonly',
            },
        },

        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,

            // Import tartibini saqlash
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                },
            ],

            // Naming conventions
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: ['variable', 'function'],
                    format: ['camelCase'],
                    filter: {
                        regex: '^(Role)$',
                        match: false,
                    },
                    leadingUnderscore: 'allow',
                },
                { selector: 'class', format: ['PascalCase'] },
                {
                    selector: 'variable',
                    modifiers: ['const', 'global'],
                    types: ['boolean', 'string', 'number'],
                    format: ['UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
                { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
                { selector: 'typeAlias', format: ['PascalCase'] },
            ],

            // TypeScript qoidalari
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // Async/await qoidalari
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-floating-promises': 'error',

            // Umumiy qoidalar
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            eqeqeq: ['error', 'always'],
            'no-unused-expressions': 'error',
            'no-duplicate-imports': 'error',

            // Error handling
            'no-throw-literal': 'error',
            'handle-callback-err': 'error',
        },
    },
    prettier, // Prettier konfiguratsiyasini yuklash
];
