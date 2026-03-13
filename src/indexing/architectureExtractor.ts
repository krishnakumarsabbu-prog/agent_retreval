
import {FileNode} from "../types/types.js"

function detectLayer(name:string){

 name=name.toLowerCase()

 if(name.includes("controller"))return"controller"
 if(name.includes("service"))return"service"
 if(name.includes("repo"))return"repository"
 if(name.includes("model"))return"model"

 return"other"
}

export function extractArchitecture(files:FileNode[]){

 const arch:any={}

 files.forEach(f=>{

  const module=f.path.split("/")[1]||"root"

  if(!arch[module])arch[module]={}

  const layer=detectLayer(f.name)

  if(!arch[module][layer])arch[module][layer]=[]

  arch[module][layer].push(f.path)

 })

 return arch
}
