# Project Conventions and Standards

This document outlines the coding conventions, naming standards, and best practices for the WhatsApp Group Messaging Bot project.

---

## 📋 Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Code Style Guidelines](#code-style-guidelines)
3. [Git Commit Conventions](#git-commit-conventions)
4. [Documentation Standards](#documentation-standards)
5. [Project Structure Standards](#project-structure-standards)
6. [JavaScript Best Practices](#javascript-best-practices)

---

## 📁 File Naming Conventions

### Source Code Files
**Standard**: `kebab-case.js` (preferred) or `camelCase.js`

```
✅ Good:
- whatsapp.js
- config.js
- helpers.js
- devotional-scheduler.js
- todays-devotional.js

❌ Avoid:
- WhatsApp.js (PascalCase - reserved for classes/components)
- whatsapp_bot.js (snake_case - not JavaScript convention)
- whatsappBot.js (inconsistent - pick one style)
```

**Current Project Files:**
- `whatsapp.js` ✅ (main application)
- `config.js` ✅ (configuration module)
- `helpers.js` ✅ (utility functions)
- `devotional-scheduler.js` ✅ (scheduler script)
- `todays-devotional.js` ⚠️ (should be kebab-case)

### Documentation Files
**Standard**: `UPPERCASE.md` for main docs, `kebab-case.md` for supporting docs

```
✅ Good:
- README.md (main documentation)
- CONTRIBUTING.md (contribution guidelines)
- CHANGELOG.md (version history)
- LICENSE (license file)
- CODE_OF_CONDUCT.md (code of conduct)

Supporting Docs (kebab-case):
- quick-start.md
- scheduler-setup.md
- refactor-notes.md
- project-structure.md
```

**Current Project Files:**
- `README.md` ✅
- `QUICK-START.md` ⚠️ (should be quick-start.md or keep as is for visibility)
- `SCHEDULER-README.md` ⚠️ (should be scheduler-setup.md)
- `REFACTOR-NOTES.md` ⚠️ (should be refactor-notes.md)
- `README-REFACTORING.md` ⚠️ (should be refactoring-summary.md)
- `PROJECT-STRUCTURE.md` ⚠️ (should be project-structure.md)
- `COMPLETED-WORK-SUMMARY.md` ⚠️ (should be work-summary.md)

### Script Files
**Standard**: `kebab-case.{sh,ps1,bat}`

```
✅ Good:
- setup-task-scheduler.ps1
- run-devotional.bat
- start-bot.sh
- deploy-production.sh
```

**Current Project Files:**
- `setup-task-scheduler.ps1` ✅
- `run-devotional.bat` ✅

### Configuration Files
**Standard**: dot-notation or kebab-case

```
✅ Good:
- package.json
- .gitignore
- .editorconfig
- .eslintrc.json
- .prettierrc
- config.js
```

### Data Files
**Standard**: `kebab-case` or `snake_case`

```
✅ Good:
- devotional-content.txt
- textfile.txt
- session-data.json
```

---

## 💻 Code Style Guidelines

### JavaScript Style

#### Variables and Functions
```javascript
// ✅ Good - camelCase
const userName = 'John';
const isActive = true;
function getUserData() { }
const calculateTotal = () => { };

// ❌ Bad
const user_name = 'John';  // snake_case (not JS convention)
const UserName = 'John';   // PascalCase (reserved for classes)
```

#### Constants
```javascript
// ✅ Good - UPPER_SNAKE_CASE for true constants
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const DAYS_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  // ...
};

// ✅ Also acceptable - camelCase for config objects
const config = {
  apiUrl: 'https://api.example.com',
  maxRetries: 3
};
```

#### Classes
```javascript
// ✅ Good - PascalCase
class WhatsAppClient { }
class MessageScheduler { }

// ❌ Bad
class whatsapp_client { }
class messageScheduler { }
```

#### Private Properties/Methods
```javascript
// ✅ Good - prefix with underscore or use # for private fields
class MyClass {
  #privateField = 'private';
  _internalMethod() { }
}
```

### Indentation and Formatting
```javascript
// ✅ Good - 2 spaces, consistent style
if (condition) {
  doSomething();
} else {
  doSomethingElse();
}

// Use template literals for strings with variables
const message = `Hello, ${name}!`;

// Use arrow functions for callbacks
array.map(item => item.value);

// Async/await over promises
async function fetchData() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### Modern JavaScript Features
```javascript
// ✅ Use const/let, never var
const immutable = 'cannot change';
let mutable = 'can change';

// ✅ Destructuring
const { name, age } = user;
const [first, second] = array;

// ✅ Spread operator
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: 'value' };

// ✅ Optional chaining
const value = obj?.property?.deepProperty;

// ✅ Nullish coalescing
const result = value ?? defaultValue;
```

---

## 📝 Git Commit Conventions

**Standard**: [Conventional Commits](https://www.conventionalcommits.org/)

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, no logic change)
refactor: Code refactoring (no feature/bug change)
perf:     Performance improvements
test:     Adding or updating tests
build:    Build system or dependencies
ci:       CI/CD changes
chore:    Other changes (maintenance, cleanup)
revert:   Revert a previous commit
```

### Examples
```bash
# ✅ Good commits
git commit -m "feat: add session persistence for WhatsApp client"
git commit -m "fix: resolve race condition in file loading"
git commit -m "docs: update README with scheduler setup instructions"
git commit -m "refactor: extract scheduling logic to helpers module"

# ✅ With scope
git commit -m "feat(scheduler): add Node.js cross-platform scheduler"
git commit -m "fix(config): correct group name constants"

# ✅ With body
git commit -m "feat: add automated devotional scheduler

- Windows Task Scheduler support
- PM2/Node.js support
- Comprehensive logging
- Error handling and recovery"

# ❌ Bad commits
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
git commit -m "WIP"
```

### Commit Message Rules
1. Use imperative mood ("add" not "added" or "adds")
2. Don't capitalize first letter
3. No period at the end
4. Keep subject line under 50 characters
5. Separate subject from body with blank line
6. Wrap body at 72 characters
7. Use body to explain what and why, not how

---

## 📚 Documentation Standards

### README.md Structure
```markdown
# Project Title
Brief description

## Features
- Feature 1
- Feature 2

## Installation
Step-by-step installation

## Usage
How to use the project

## Configuration
Configuration options

## Contributing
How to contribute

## License
License information
```

### Code Comments
```javascript
// ✅ Good - JSDoc comments for functions
/**
 * Schedules a message to be sent at a specific time
 * @param {Object} client - WhatsApp client instance
 * @param {Date} scheduledTime - When to send the message
 * @param {string} groupName - Name of the WhatsApp group
 * @param {string} message - Message to send
 * @returns {number|null} - setTimeout ID or null if failed
 */
function scheduleMessage(client, scheduledTime, groupName, message) {
  // Implementation
}

// ✅ Good - inline comments for complex logic
// Calculate delay accounting for timezone offset
const delay = scheduledTime.getTime() - Date.now();

// ❌ Bad - obvious comments
const x = 5; // Set x to 5
```

### Markdown Formatting
```markdown
# H1 - Main title (use once per file)
## H2 - Major sections
### H3 - Subsections

**Bold** for emphasis
*Italic* for slight emphasis
`code` for inline code
```code blocks``` for multi-line code

- Bullet list item
- Another item

1. Numbered list
2. Another item

[Link text](URL)
![Image alt](image-url)
```

---

## 🏗️ Project Structure Standards

### Directory Organization
```
project-root/
├── src/              # Source code (if using src directory)
│   ├── config/       # Configuration files
│   ├── utils/        # Utility functions
│   ├── services/     # Business logic
│   └── index.js      # Entry point
├── docs/             # Documentation (alternative to root-level .md files)
│   ├── api.md
│   └── setup.md
├── scripts/          # Utility scripts (build, deploy, etc.)
├── logs/             # Log files (gitignored)
├── tests/            # Test files
│   ├── unit/
│   └── integration/
└── package.json
```

**Current Project** (simplified, no src folder):
```
whatsgroupMessaging/
├── whatsapp.js           # Entry point
├── config.js             # Configuration
├── helpers.js            # Utilities
├── todays-devotional.js  # Content fetcher
├── devotional-scheduler.js # Scheduler
├── scripts/              # Scripts directory
│   ├── setup-task-scheduler.ps1
│   └── run-devotional.bat
├── docs/                 # Documentation directory
│   └── *.md files
├── logs/                 # Logs (gitignored)
└── package.json
```

---

## 🎯 JavaScript Best Practices

### Error Handling
```javascript
// ✅ Good - Always use try-catch for async operations
async function fetchData() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    throw error; // Re-throw or handle appropriately
  }
}

// ✅ Good - Validate inputs
function calculateTotal(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  // Implementation
}
```

### Async Operations
```javascript
// ✅ Good - Use async/await
async function processData() {
  const data = await fetchData();
  const processed = await transformData(data);
  return processed;
}

// ❌ Avoid - Callback hell
fetchData((data) => {
  transformData(data, (processed) => {
    saveData(processed, (result) => {
      // ...
    });
  });
});
```

### Module Organization
```javascript
// ✅ Good - Clear exports
// config.js
const GROUPS = { /* ... */ };
const MESSAGES = { /* ... */ };

module.exports = {
  GROUPS,
  MESSAGES,
  SCHEDULE
};

// ✅ Good - Clear imports
const { GROUPS, MESSAGES } = require('./config');
```

### Security Best Practices
```javascript
// ✅ Good - Use environment variables for secrets
const apiKey = process.env.API_KEY;

// ✅ Good - Validate user input
function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}

// ✅ Good - Use .env files (never commit)
require('dotenv').config();
```

---

## 📦 Package.json Standards

### Essential Fields
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Clear description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "keywords": ["keyword1", "keyword2"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Semantic Versioning
```
MAJOR.MINOR.PATCH

1.0.0 - Initial release
1.0.1 - Bug fix (patch)
1.1.0 - New feature, backwards compatible (minor)
2.0.0 - Breaking change (major)
```

---

## ✅ Checklist for New Code

Before committing new code, ensure:

- [ ] File names follow conventions
- [ ] Code is properly formatted (use Prettier)
- [ ] No linter errors (use ESLint)
- [ ] Functions have JSDoc comments
- [ ] Error handling is implemented
- [ ] Console.logs are appropriate (not debugging logs)
- [ ] Commit message follows Conventional Commits
- [ ] Documentation is updated if needed
- [ ] No sensitive data (API keys, passwords) in code

---

## 🔧 Tools for Enforcement

### EditorConfig
Install `.editorconfig` for consistent editor settings across team.

### ESLint
```bash
npm install --save-dev eslint
npx eslint --init
npm run lint
```

### Prettier
```bash
npm install --save-dev prettier
npm run format
```

### Husky (Git Hooks)
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

---

## 📚 References

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

**Last Updated**: November 21, 2025  
**Version**: 1.0.0  
**Maintained By**: Project Team

