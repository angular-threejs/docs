/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 4,
	printWidth: 120,
	singleQuote: true,
	htmlWhitespaceSensitivity: 'ignore',
	plugins: ['prettier-plugin-astro', 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
