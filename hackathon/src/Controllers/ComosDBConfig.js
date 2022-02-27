const process = require('dotenv').config()
const CosmosClient = require("@azure/cosmos").CosmosClient;

const endpoint = process.env.azure_cosmos_endpoint
const key = process.env.azure_cosmos_key
const client = new CosmosClient({ endpoint, key });

const db = client.database('MoneyBean')
const expensesTable = db.container('ExpensesTest')

module.exports = {
    addItems: async function (items) {
        try {
            await expensesTable.items.create(items)
            console.log("Successfully Added Items")
        } catch(error) {
            console.log("Unable to Add Items. Error: " + error)
        }
    },
    getItems: async function() {
        try {
            const querySpec = {
            query: "SELECT * from c"
            };
            
            const { resources: items } = await expensesTable.items
            .query(querySpec)
            .fetchAll();
            console.log("Query Succeeded")
            return items;
        } catch (error) {
            console.log(error);
        }
        
    },
    deleteItems: async function() {
        try {
            let querySpec = {
            query: "SELECT * from c"
            };
            
            const { resources: items } = await expensesTable.items
            .query(querySpec)
            .fetchAll();
            for(let item in items) {
                await expensesTable.items
            }
            console.log("Query Succeeded")
            return items;
        } catch (error) {
            console.log(error);
        }
    },
    getTotal:async function (expenseCategory) {
        try {
            const querySpec = {
            query: "SELECT SUM(*) from c where c.ExpenseCategory = " + expenseCategory
            };
            
            const { resources: total } = await expensesTable.items
            .query(querySpec)
            .fetchAll();
            console.log("Query Succeeded")
            return total;
        } catch (error) {
            console.log(error);
        }
    },
    batchOperation: async function(opType, body) {
        try {
            let operations = []


            for (let item in body) {
                operations.push({
                    operationType:opType,
                    partitionKey:"/expensesTest",
                    resourceBody: body[item]
                })
            }
            
            await expensesTable.items.bulk(operations, true,true)
            console.log("Batch Operation Succeeded")
        } catch (error) {
            console.log("Batch Operation Failed. Error: " + error);
        }
    }
}