# Universal AI Code Agent

A production-grade TypeScript code analysis agent that indexes repositories, builds dependency graphs, and performs intelligent semantic code retrieval across all programming languages.

## Features

### Universal Language Support

Supports **40+ programming languages** including:
- **Web**: TypeScript, JavaScript, HTML, CSS, Vue, Svelte
- **Backend**: Python, Java, Go, Rust, C/C++, C#, PHP, Ruby
- **Mobile**: Kotlin, Swift, Dart, Objective-C
- **Functional**: Scala, Haskell, Elixir, OCaml, Clojure
- **Data**: SQL, R
- **Config**: YAML, JSON, TOML
- **Infrastructure**: Shell, Dockerfile, Terraform, Makefile

### Intelligent File Scanning

- Recursively scans entire repositories
- Automatically excludes build artifacts and dependencies
- Filters out binary files
- Handles large repositories efficiently (10k+ files)
- Language detection based on file extension and shebang

### Multi-Language Import Detection

Extracts import/dependency statements from:
- **JavaScript/TypeScript**: `import`, `require()`, `export`
- **Python**: `import`, `from...import`
- **Java**: `import`, `import static`
- **Go**: `import`
- **Rust**: `use`, `extern crate`
- **C/C++**: `#include`
- **C#**: `using`
- **PHP**: `require`, `include`, `use`
- **Ruby**: `require`, `require_relative`
- And more...

### Symbol Extraction

Identifies and indexes code symbols:
- Functions and methods
- Classes and interfaces
- Types and type aliases
- Constants and variables
- Supports 10+ languages with proper syntax patterns

### Dependency Graph

- Builds a complete dependency graph between files
- Resolves relative imports correctly
- Handles module resolution (index files, extensions)
- Enables graph-based code exploration

### Advanced Search Engine

Token-based search with intelligent scoring:
- **Filename matching** (50 points) - exact matches in filenames
- **Path matching** (20 points) - directory and path context
- **Token matching** (30 points) - exact word boundaries
- **Symbol matching** (40 points) - function/class names
- **Content matching** (2-20 points) - keyword frequency
- **Import matching** (5 points) - dependency awareness
- **Multi-token bonus** (25 points) - all query terms present

### Graph-Based Retrieval

Expands search results using dependency graph:
1. Find initial matches with keyword search
2. Traverse dependency edges
3. Include related files (imports and dependents)
4. Provides complete context for LLM analysis

## Installation

```bash
npm install
npm run build
```

## Usage

### Basic Indexing

Index a repository:
```bash
node dist/main.js /path/to/repo
```

### Search Queries

Index and search in one command:
```bash
node dist/main.js /path/to/repo "authentication"
```

### Examples

Search for authentication logic:
```bash
node dist/main.js . "authentication login"
```

Find database code:
```bash
node dist/main.js . "database connection"
```

Locate API endpoints:
```bash
node dist/main.js . "api endpoint routes"
```

## Project Structure

```
src/
├── agent.ts                    # Main agent API
├── main.ts                     # CLI entry point
├── types/
│   └── index.ts               # TypeScript type definitions
├── scanner/
│   └── fileScanner.ts         # Repository file scanner
├── languages/
│   ├── detector.ts            # Language detection
│   ├── importDetector.ts      # Multi-language import extraction
│   └── symbolExtractor.ts     # Symbol/function extraction
├── indexer/
│   └── indexer.ts             # Main indexing orchestrator
├── graph/
│   └── graphBuilder.ts        # Dependency graph construction
└── retrieval/
    └── searcher.ts            # Search and ranking engine
```

## API

### Agent Functions

```typescript
import { buildIndex, search, searchWithGraph } from './agent.js'

// Index a repository
const index = buildIndex('/path/to/repo')

// Search for files
const results = search('authentication', 10)

// Search with graph expansion
const files = searchWithGraph('database', 5, 1)
```

### Repository Index Structure

```typescript
interface RepositoryIndex {
  files: FileNode[]           // All indexed files
  graph: CodeGraph            // Dependency graph
  statistics: IndexStatistics // Metadata
}

interface FileNode {
  path: string
  name: string
  extension: string
  language: string
  content: string
  size: number
  imports: string[]           // Extracted imports
  symbols: Symbol[]           // Extracted symbols
}

interface CodeGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
```

## Output

The agent generates `repository_index.json` containing:
- All file contents and metadata
- Extracted imports for each file
- Extracted symbols (functions, classes, etc.)
- Complete dependency graph
- Language distribution statistics

## Performance

- Indexes 1000+ files in seconds
- Efficient memory usage with streaming
- Skips binary files and build directories
- Configurable file size limits (10MB default)

## Search Examples

### Query: "authentication"

Results ranked by:
1. Files named `auth.ts`, `authentication.js`
2. Files in `/auth/` directories
3. Files with `login()`, `authenticate()` functions
4. Files importing authentication modules
5. Files with high keyword frequency

### Query: "database connection pool"

Multi-token search finds files with:
- All three keywords present (bonus score)
- Database classes and functions
- Connection management code
- Pool configuration

## Graph Expansion

Starting from search results, the graph expands to include:
- Direct dependencies (files imported by matches)
- Direct dependents (files that import matches)
- Configurable depth (1-2 levels recommended)

This provides complete context for LLM code understanding.

## Technical Highlights

### Excluded Directories
`node_modules`, `.git`, `dist`, `build`, `target`, `out`, `bin`, `.idea`, `.vscode`, `coverage`, and all hidden directories (starting with `.`)

### Excluded Files
- All hidden files (starting with `.`) including `.env`, `.gitignore`, `.eslintrc`, etc.
- Binary files: `.png`, `.jpg`, `.gif`, `.zip`, `.tar`, `.gz`, `.exe`, `.dll`, `.so`, `.class`
- Lock files: `.lock`, `.log`

### Import Resolution
- Handles relative imports (`./, ../`)
- Resolves TypeScript `.js` extensions to `.ts` files
- Checks index files (`index.ts`, `__init__.py`)
- Normalizes paths across platforms

### Symbol Patterns
Uses regex patterns optimized for each language:
- Function declarations
- Class definitions
- Interface/trait declarations
- Type definitions
- Method signatures

## Limitations

- No AST parsing (regex-based for performance)
- Limited to text files (no binary analysis)
- External package imports not resolved
- Monorepo support is basic

## Future Enhancements

- AST-based parsing for better accuracy
- Semantic code embeddings
- Call graph construction
- Test-to-code mapping
- Documentation extraction
- Code metrics and complexity

## License

MIT
