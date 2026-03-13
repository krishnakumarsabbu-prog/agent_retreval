
import {FileNode,CodeGraph} from "../types/types.js"

export function buildGraph(files:FileNode[]):CodeGraph{

 const nodes=[]
 const edges=[]

 files.forEach(f=>{
   nodes.push({id:f.path,type:"file"})
 })

 return {nodes,edges}
}
