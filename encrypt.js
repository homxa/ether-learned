require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs");
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encrypted = await wallet.encrypt(
    process.env.PASSWARD );
  console.log(encrypted);
fs.writeFileSync('./privatekey.json', encrypted)

}

main();
