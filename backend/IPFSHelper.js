
const {Web3Storage} = require('web3.storage');
const {getFilesFromPath} = require('web3.storage');

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

async function getFiles (path) {
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
  }

async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

module.exports = {getFiles,storeFiles}