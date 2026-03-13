
import {CodeGraph} from "../types/types.js"

export function expandGraph(graph:CodeGraph,seeds:string[]){

 const results=new Set(seeds)

 graph.edges.forEach(e=>{
  if(results.has(e.from))results.add(e.to)
  if(results.has(e.to))results.add(e.from)
 })

 return Array.from(results)
}
