module.exports = {
  '**/*.(ts|tsx)': () => 'tsc --pretty --noEmit',

  '**/*.(ts|tsx|js)': (filenames) => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.(md|json)': (filenames) =>
    `prettier --write ${filenames.join(' ')}`,
}