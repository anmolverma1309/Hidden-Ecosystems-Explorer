import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const OUTPUT_FILE = './src/data/code_dependencies.json';

const nodes = [];
const links = [];
const fileMap = new Set();

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const relPath = path.relative(SRC_DIR, fullPath).replace(/\\/g, '/');
            fileMap.add(relPath);
            nodes.push({
                id: relPath,
                name: file,
                type: fullPath.includes('components') ? 'component' : 
                      fullPath.includes('sections') ? 'section' : 
                      fullPath.includes('data') ? 'data' : 'utility',
                size: stat.size
            });
        }
    }
}

function extractImports() {
    for (const node of nodes) {
        const fullPath = path.join(SRC_DIR, node.id);
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Simple regex for imports
        const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            let importPath = match[1];
            
            // Resolve relative paths
            if (importPath.startsWith('.')) {
                const dir = path.dirname(node.id);
                let resolved = path.join(dir, importPath).replace(/\\/g, '/');
                
                // Handle cases where extension is missing
                if (!resolved.endsWith('.js') && !resolved.endsWith('.jsx')) {
                    if (fileMap.has(resolved + '.jsx')) resolved += '.jsx';
                    else if (fileMap.has(resolved + '.js')) resolved += '.js';
                    else if (fileMap.has(path.join(resolved, 'index.jsx').replace(/\\/g, '/'))) resolved = path.join(resolved, 'index.jsx').replace(/\\/g, '/');
                    else if (fileMap.has(path.join(resolved, 'index.js').replace(/\\/g, '/'))) resolved = path.join(resolved, 'index.js').replace(/\\/g, '/');
                }

                if (fileMap.has(resolved)) {
                    links.push({ source: node.id, target: resolved });
                }
            }
        }
    }
}

console.log('Scanning src directory...');
walk(SRC_DIR);
console.log(`Found ${nodes.length} files.`);
console.log('Extracting dependencies...');
extractImports();
console.log(`Found ${links.length} dependencies.`);

const data = { nodes, links };
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`Saved to ${OUTPUT_FILE}`);
