
import {FileNode} from "../types/types.js"

const anchors=[
"README.md","package.json","requirements.txt","main.py","index.ts","index.js","Dockerfile"
]

export function detectAnchors(files:FileNode[]){
 return files.filter(f=>anchors.includes(f.name))
}
