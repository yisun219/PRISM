const majorVersion = Number.parseInt(process.versions.node.split('.')[0], 10);

if (majorVersion !== 22) {
  console.error('PRISM expects Node.js 22 for local development.');
  console.error(`Current version: ${process.version}`);
  console.error('Please run `nvm use` in the project root and then start the dev server again.');
  process.exit(1);
}