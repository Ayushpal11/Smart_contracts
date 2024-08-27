
//importing crypto-js library
const SHA256 = require('crypto-js/sha256');
const { stringify } = require('querystring');


//creating a block class
class Block{
    constructor(index, timestamp,data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nounce=0;
    }
    //function to calculate hash
calculateHash(){
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nounce).toString();
}


//function to mine block
mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) != Array(difficulty+1).join("0"))
{
        this.nounce++;
        this.hash = this.calculateHash();
    }
}
}

//creating a blockchain class
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty=6;
    }
    //creating a genesis block
    createGenesisBlock(){
        return new Block(0, "08/08/2024", "This is Genesis Block", "0");
    }//function to get latest block
     getLatestBlock(){
         return this.chain[this.chain.length-1];
    }
    //function to add a block
     addBlock(newBlock){
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.mineBlock(this.difficulty);
         this.chain.push(newBlock);
     }

        //function to check if chain is valid

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
    
}

//creating a blockchain object
let myCoin=new Blockchain();
console.log("Genesis Block created ....");
console.log(JSON.stringify(myCoin, null, 4));

//adding blocks to the blockchain
console.log("Mining Block 1 ....");
myCoin.addBlock(new Block(1,"08/08/2024","this is block 1"));
console.log(JSON.stringify(myCoin, null, 4));

//adding blocks to the blockchain
console.log("Mining Block 2 ....");
myCoin.addBlock(new Block(2,"08/00/2024","this is block 2"));
console.log(JSON.stringify(myCoin, null, 4));
//changing the data of block 1
myCoin.chain[1].data={amount:100};
myCoin.chain[1].hash=myCoin.chain[1].calculateHash();
console.log("is Chain Valid?"+ myCoin.isChainValid() );
console.log(JSON.stringify(myCoin, null, 4));
//changing the data of block 2
