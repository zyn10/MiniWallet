require('dotenv').config();
const  Web3 = require('web3');

//----> getblock is the medium between blockchain and computer

const apiKey = process.env['apiKey'];
const network = "Sepolia";

const node = `https://eth.getblock.io/${apiKey}/${network}/`
const web3 = new Web3(node)
//console.log(web3);

//Creating random Account
//const RandomaccountTo = web3.eth.accounts.create();
//console.log(accountTo);

 const accountTo = web3.eth.accounts.create();
 const senderPvtK = process.env['privateKey'];
 const accountFrom = web3.eth.accounts.privateKeyToAccount(senderPvtK);

 // sign our transaction
 const createSignedTx =  async (rawTx)=>{
 	rawTx.gas= await web3.eth.estimateGas(rawTx);//---> gas that will be used
 	return await accountFrom.signTransaction(rawTx);
 }

 //send the signed transaction

 const sendSignedTx = async(signedTrx)=>{
 	web3.eth.sendSignedTransaction(signedTrx.rawTransaction).then(console.log)
 }


// transfer ether to my wallet
 const amountTo="0.01"//ether

const rawTx = {
 	to: accountTo.address,
 	value: web3.utils.toWei(amountTo,"ether")
 }

 createSignedTx(rawTx).then(sendSignedTx)