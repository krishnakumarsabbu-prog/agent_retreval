
import fs from "fs"
import {scanDirectory} from "./utils/fileScanner.js"
import {detectAnchors} from "./indexing/anchorDetector.js"
import {minePatterns} from "./indexing/patternMining.js"
import {extractArchitecture} from "./indexing/architectureExtractor.js"
import {buildStructuralEmbeddings} from "./indexing/structuralEmbeddings.js"
import {buildGraph} from "./graph/codeGraph.js"
import {simpleSearch} from "./retrieval/vectorSearch.js"
import {expandGraph} from "./retrieval/graphRetriever.js"
import {AgentIndex} from "./types/types.js"

let indexData:AgentIndex

export function index(path:string){

 const files=scanDirectory(path)

 const anchors=detectAnchors(files)

 const patterns=minePatterns(files)

 const architecture=extractArchitecture(files)

 const embeddings=buildStructuralEmbeddings(files)

 const graph=buildGraph(files)

 indexData={
  files,
  anchors,
  patterns,
  architecture,
  modules:{},
  embeddings,
  graph
 }

 fs.writeFileSync("agent_index.json",JSON.stringify(indexData,null,2))

 return indexData
}

export function getFiles(userQuestion:string){

 if(!indexData)throw new Error("Run index() first")

 const vectorResults=simpleSearch(userQuestion,indexData.embeddings)

 const seeds=vectorResults.map(v=>v.id)

 const graphExpanded=expandGraph(indexData.graph,seeds)

 return graphExpanded.slice(0,20)
}
