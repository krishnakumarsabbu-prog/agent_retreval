# Usage Guide

## Quick Start

### 1. Build the Project
```bash
npm install
npm run build
```

### 2. Index a Repository
```bash
# Index current directory
node dist/main.js .

# Index specific path
node dist/main.js /path/to/your/repo
```

### 3. Search Code
```bash
# Index and search in one command
node dist/main.js . "authentication"

# Search with multiple keywords
node dist/main.js . "database connection pool"
```

## Examples

### Example 1: Index a React Project
```bash
node dist/main.js /path/to/react-app
```

Output:
```
=== Indexing Repository: /path/to/react-app ===
Scanning repository...
Found 234 files
Extracting imports and symbols...
Building dependency graph...
Graph: 234 nodes, 456 edges

=== Index Complete ===
Total Files: 234
Total Lines: 45,678
Total Symbols: 1,234
Graph Edges: 456
Duration: 234ms

Language Distribution:
  typescript: 120 files
  javascript: 45 files
  css: 30 files
  json: 15 files
  ...
```

### Example 2: Find Authentication Code
```bash
node dist/main.js . "authentication login"
```

Output shows:
- Files ranked by relevance score
- Matched symbols (functions, classes)
- Match reasons (why each file was selected)
- Graph-expanded context files

### Example 3: Locate Database Code
```bash
node dist/main.js /path/to/backend "database query"
```

Returns:
- Database connection files
- Query builder modules
- Repository classes
- Related utility files

### Example 4: Find API Endpoints
```bash
node dist/main.js . "api route endpoint"
```

Finds:
- Route definition files
- Controller files
- Middleware
- Request handlers

## Understanding Results

### Search Results Format
```
1. src/auth/login.ts (score: 245)
   Language: typescript
   Symbols: 12
   Reasons: Filename contains "login", Symbol match: function "handleLogin", Found "authentication" 8 times in content
```

**Score Components:**
- Higher score = more relevant
- Multiple scoring factors combined
- Reasons explain why file matched

### Graph Expansion
```
=== Graph Expansion ===
Seeds: 5
Expanded to: 15 files

Files to provide as context to LLM:
  1. src/auth/login.ts
  2. src/auth/middleware.ts
  3. src/auth/types.ts
  4. src/utils/jwt.ts
  ...
```

**What This Means:**
- Started with 5 top search results
- Expanded to 15 files using dependency graph
- Includes imports and dependents
- Provides complete context for LLM

## Advanced Usage

### Programmatic API

```typescript
import { buildIndex, search, searchWithGraph, saveIndex, loadIndex } from './agent.js'

// Index a repository
const index = buildIndex('/path/to/repo')

// Save index to disk
saveIndex('my_index.json')

// Search for files
const results = search('authentication', 10)

// Get related files using graph
const contextFiles = searchWithGraph('authentication', 5, 2)

// Load previously saved index
const loadedIndex = loadIndex('my_index.json')
```

### Custom Search Filters

```typescript
import { searchByLanguage, searchBySymbol } from './retrieval/searcher.js'
import { getIndex } from './agent.js'

const index = getIndex()

// Find all Python files
const pythonFiles = searchByLanguage('python', index.files)

// Find files with specific function
const files = searchBySymbol('authenticate', index.files)
```

## Output Files

### repository_index.json

Complete repository index containing:
```json
{
  "files": [
    {
      "path": "src/main.ts",
      "name": "main.ts",
      "extension": ".ts",
      "language": "typescript",
      "content": "...",
      "imports": ["./agent.js"],
      "symbols": [
        {
          "name": "main",
          "type": "function",
          "line": 15
        }
      ]
    }
  ],
  "graph": {
    "nodes": [...],
    "edges": [
      {
        "from": "src/main.ts",
        "to": "src/agent.ts",
        "type": "import"
      }
    ]
  },
  "statistics": {
    "totalFiles": 234,
    "totalLines": 45678,
    "languageDistribution": {
      "typescript": 120,
      "javascript": 45
    },
    "symbolCount": 1234
  }
}
```

## Performance Tips

### Large Repositories
- First run will take longer (indexing)
- Subsequent searches are fast (use loaded index)
- 10MB file size limit (configurable)

### Optimizing Queries
- Use specific keywords
- Multi-word queries work well
- Include symbol names for better matches

### Memory Usage
- Binary files automatically excluded
- Large files skipped
- Efficient streaming

## Troubleshooting

### No Results Found
- Check spelling of query terms
- Try broader keywords
- Verify files contain expected content

### Missing Dependencies
```bash
npm install
```

### Build Errors
```bash
rm -rf dist node_modules
npm install
npm run build
```

### Graph Has No Edges
- Check if files have relative imports
- External package imports are not tracked
- Some files may have no dependencies

## Integration with LLMs

### Use Case: Code Understanding
1. Index your repository
2. Search for relevant topic
3. Get graph-expanded file list
4. Provide files to LLM as context

### Example Workflow
```bash
# Index repository
node dist/main.js /my/project

# Search for authentication code
node dist/main.js /my/project "auth login"

# Use the expanded file list:
# - Copy file contents
# - Provide to ChatGPT/Claude
# - Ask questions about the code
```

### Context Window Optimization
- Top search results are most relevant
- Graph expansion provides necessary context
- Adjust topK and depth parameters
- Start with topK=5, depth=1

## Best Practices

1. **Index once, search many times**
   - Save index to disk
   - Load for subsequent searches

2. **Use specific queries**
   - "user authentication" > "auth"
   - "database connection pool" > "database"

3. **Leverage graph expansion**
   - Provides complete context
   - Includes dependencies
   - Better than isolated files

4. **Review match reasons**
   - Understand why files matched
   - Refine queries based on reasons

5. **Check language distribution**
   - Verify expected files indexed
   - Review excluded files if needed
