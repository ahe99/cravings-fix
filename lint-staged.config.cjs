module.exports = {
  'package.json': ['prettier --write'],
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write', 'tsc --noEmit'],
  '*.css': ['prettier --write'],
  '*.md': ['prettier --write'],
}
