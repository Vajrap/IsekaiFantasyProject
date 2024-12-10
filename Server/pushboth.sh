#!/bin/bash

# Run tests
# npm test || { echo "Tests failed. Aborting push."; exit 1; }

# Run linter
# npm run lint || { echo "Linting failed. Aborting push."; exit 1; }

# Check for unstaged changes
if [[ -n $(git status --porcelain) ]]; then
    echo "You have unstaged changes. Please commit or stash them before pushing.";
    exit 1;
fi

# Check for circular dependencies
npx madge --circular --extensions ts . || { echo "Circular dependencies found. Aborting push."; exit 1; }

# Check for merge conflicts
if git diff --check | grep -q '^<<<<<<<'; then
    echo "Merge conflicts detected. Please resolve them before pushing.";
    exit 1;
fi

# Push to both repositories
git push gitlab "$@"
git push github "$@"