
export interface FileNode {
  path: string
  name: string
  ext: string
}

export interface CodeGraph {
  nodes: { id: string, type: string }[]
  edges: { from: string, to: string, type: string }[]
}

export interface AgentIndex {
  files: FileNode[]
  anchors: FileNode[]
  patterns: any
  architecture: any
  modules: any
  embeddings: any[]
  graph: CodeGraph
}
