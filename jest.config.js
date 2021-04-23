module.exports = {
  //testEnvironment: 'node',
  moduleDirectories: [
    'node_modules',
    'tests',
    __dirname,
    'src/client',
    'src/server',
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  /*
     Regex explanation:
     -> Look for the folder "tests".
     -> Look for a folder named "client" or "server" (and put the result in a capturing group).

     -> "Expect" a file with a name of anything from one character to unlimited -
     (matching as few times as possible: "?").
        --> I'm using "?:" here to put the result in a "non-capturing group", (telling the regex-engine to not
         remember the match for later) as I only use a capturing-group here to organize the different parts into groups.

     -> The filename must contain "-test" or ".test".

     -> Must end with/have any of the following extensions: "js", "jsx", "ts", "tsx".
        --> e.g: a-test.js, theGreatestTestEverMade.test.js, b.test.jsx, ultimate-types.test.ts, reactTypes-test.tsx
         etc.
        --> NB: This is done by checking if the file-extension starts with "t" and then contains "s" and possibly an
         "x", and repeat the process for "js" or "jsx" etc.
     */
  testRegex: 'tests/(client|server)/(?:.+?)(?:-|.)test\\.([tj]sx?)',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/client/__snapshots__',
  ],
};

// With capturing groups
// \/?(?<parentDirectory>\w+)\/(?=(?<testFile>\w+(?:-\w+)?(?:\.|-)test(?<fileExtension>\.jsx?)))

// without capturing groups
// \/?(\w+)\/(?=(\w+(?:-\w+)?(?:\.|-)test(\.jsx?)))
