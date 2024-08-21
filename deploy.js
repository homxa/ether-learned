//use npm run compile to deploy
require('dotenv').config()
const ethers = require("ethers");
const fs = require("fs");

//http://localhost:7545

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  //this is how to decript the wallt private key from the json file
// let walletdecrypt =  fs.readFileSync('./privatekey.json', 'utf8');
//   let wallet =  ethers.Wallet.fromEncryptedJsonSync(walletdecrypt, process.env.PASSWARD);
// wallet = wallet.connect(provider)





  const wallet = new ethers.Wallet(
   process.env.PRIVATE_KEY,
    provider
  );

  

  const abi =  fs.readFileSync("./simple_sol_UserFavnumber.abi", "utf8");
  const binary = fs.readFileSync("./simple_sol_UserFavnumber.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  try {
    const auctionContract = await contractFactory.deploy({
      gasLimit: 5000000
    });

    //deploymentTransaction is use for getting deataild `when your traction is created` eg. bloc num, 
//const deployedRecipt = await auctionContract.deploymentTransaction
//console.log( deployedRecipt)

//is the recpt of the traction rscipt when the blocked it confimed
const transactionRecipt = await auctionContract.deploymentTransaction().wait(1)

//console.log(transactionRecipt)
    //console.log("Contract deployed at:", auctionContract);
    //intracting with the contract
   
    const addUser = await auctionContract.addnewUsers('hamza','7')
    const adduserRecipients = await addUser.wait(1)
    //console.log(adduserRecipients,'addUser',addUser)
const retrive = await auctionContract.retrive();
console.log(retrive.toString(),'herer')

   
   
  } catch (error) {
    console.error("Failed to deploy the contract:", error);
  }
}

main();
