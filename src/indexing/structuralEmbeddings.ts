
import {FileNode} from "../types/types.js"

export function buildStructuralEmbeddings(files:FileNode[]){

 return files.map(f=>({
  id:f.path,
  text:`File ${f.name} extension ${f.ext}`
 }))

}
