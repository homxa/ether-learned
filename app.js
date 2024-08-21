require('dotenv').config();
const ethers = require('ethers');
const fs = require('fs');

async function aution(){

const bytecode = fs.readFileSync('./audition_sol_Aution.bin', 'utf8');
const abi = fs.readFileSync('./audition_sol_Aution.abi', 'utf8');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// const decriptWallet = fs.readFileSync('./privatekey.json', 'utf8');
// let wallet  = ethers.Wallet.fromEncryptedJsonSync(decriptWallet, process.env.PASSWARD)
// wallet = wallet.connect(provider)


const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
   provider
 );



const contractFac = new ethers.ContractFactory(abi,bytecode,wallet)
 
try {
  const auditionContract = await contractFac.deploy()
  console.log(auditionContract)
} catch (error) {
  console.log('falid to deploy contract',error)
}



}

aution()