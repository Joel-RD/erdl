export default {
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!@libsql/client)'],
  transform: {},
};