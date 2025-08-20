const Transaction = require ('./transaction');

class TransactionPool{
    constructor(){
        this.transactionMap = {};
    }

    setTransaction(transaction){
        this.transactionMap[transaction.id] = transaction;
    }

    existingTransaction({inputAddress}){
        const transactions = Object.values(this.transactionMap);
        return transactions.find(transaction => transaction.input.address === inputAddress);
    }

    setMap(tradactionMap){
        this.transactionMap = tradactionMap;
     }

     validTransactions(){
        return Object.values(this.transactionMap).filter(
            transaction => Transaction.validTransaction(transaction)
        );
     }

     clear(){
        this.transactionMap = {};
     }

     clearBlockchainTransaction({chain}){
        for(let i=0; i< chain.length; i++){
            const block = chain[i];
            for(let tradaction of block.data){
                if(this.transactionMap[tradaction.id]){
                    delete this.transactionMap[tradaction.id]
                }
            }
        }
     }
}

module.exports = TransactionPool;