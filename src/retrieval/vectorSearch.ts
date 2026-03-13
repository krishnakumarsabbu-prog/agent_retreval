
export function simpleSearch(query:string, embeddings:any[]){

 const q=query.toLowerCase()

 return embeddings.filter(e=>e.text.toLowerCase().includes(q))
}
