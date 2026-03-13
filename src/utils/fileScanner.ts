import fs from "fs"
import path from "path"

const IGNORE_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "target",
  "out",
  "bin",
  ".idea",
  ".vscode"
]

const IGNORE_EXT = [
  ".png",".jpg",".jpeg",".gif",".svg",
  ".ico",".lock",".log",".zip",".tar",
  ".gz",".exe",".dll",".so",".class"
]

export function scanFiles(dir: string, files: string[] = []) {

  const items = fs.readdirSync(dir)

  for (const item of items) {

    const fullPath = path.join(dir, item)

    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {

      if (IGNORE_DIRS.includes(item)) continue

      scanFiles(fullPath, files)

    } else {

      const ext = path.extname(item).toLowerCase()

      if (IGNORE_EXT.includes(ext)) continue

      files.push(fullPath)

    }
  }

  return files
}