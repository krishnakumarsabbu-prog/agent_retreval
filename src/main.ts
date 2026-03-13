
import {index,getFiles} from "./agent.js"

const repo=process.argv[2]

if(!repo){
 console.log("Usage: node dist/main.js <repo_path>")
 process.exit(0)
}

index(repo)

const files=getFiles("authentication")

console.log(files)
