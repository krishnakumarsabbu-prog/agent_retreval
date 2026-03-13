
import {FileNode} from "../types/types.js"

export function minePatterns(files:FileNode[]){

 const patterns={
  controllers:[],
  services:[],
  repositories:[],
  models:[]
 }

 files.forEach(f=>{

  const name=f.name.toLowerCase()

  if(name.includes("controller"))patterns.controllers.push(f.path)
  if(name.includes("service"))patterns.services.push(f.path)
  if(name.includes("repo"))patterns.repositories.push(f.path)
  if(name.includes("model"))patterns.models.push(f.path)

 })

 return patterns
}
