import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`

export default {
	"**/*.(ts|tsx)": () => "tsc --pretty --noEmit",
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
	"**/*.(ts|tsx|js)": (filenames) => `prettier --write ${filenames.join(" ")}`
}