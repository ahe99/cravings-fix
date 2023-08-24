module.exports = {
  'package.json': ['prettier --write'],
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.css': ['prettier --write'],
  '*.md': ['prettier --write'],
}
