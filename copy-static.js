const fs = require('fs');
const path = require('path');

const sourceDir = './Client';
const destDir = './dist/Client';
const fileExtensions = ['.html', '.css'];

// Function to copy files
const copyFiles = (src, dest) => {
    fs.readdirSync(src, { withFileTypes: true }).forEach((entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Recursively copy directories
            fs.mkdirSync(destPath, { recursive: true });
            copyFiles(srcPath, destPath);
        } else if (fileExtensions.includes(path.extname(entry.name))) {
            // Copy only files with specified extensions
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} -> ${destPath}`);
        }
    });
};

// Ensure destination directory exists
fs.mkdirSync(destDir, { recursive: true });

// Start copying files
copyFiles(sourceDir, destDir);
console.log('Static files copied successfully.');