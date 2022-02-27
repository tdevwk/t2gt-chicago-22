// Reading the file using default
// fs npm package
const fs = require("fs");
const { batchOperation, getItems, addItems } = require("../Controllers/ComosDBConfig");
csv = fs.readFileSync("D:\\Downloads\\sample_csv2.csv")

// Convert the data to String and
// split it in an array
var array = csv.toString().split("\r");

// All the rows of the CSV will be
// converted to JSON objects which
// will be added to result in an array
let result = [];

// The array[0] contains all the
// header columns so we store them
// in headers array
let headers = array[0].split(";")
const categoryColumnExist = array[0].toLowerCase().includes("category")
let categoryColumnIndex = headers.findIndex(c => c.toLowerCase() === 'category');

// Since headers are separated, we
// need to traverse remaining n-1 rows.
for (let i = 1; i < array.length - 1; i++) {
let obj = {}

// Create an empty object to later add
// values of the current row to it
// Declare string str as current array
// value to change the delimiter and
// store the generated string in a new
// string s
let str = array[i].substring(1).split(';')
// let s = ''

// By Default, we get the comma separated
// values of a cell in quotes " " so we
// use flag to keep track of quotes and
// split the string accordingly
// If we encounter opening quote (")
// then we keep commas as it is otherwise
// we replace them with pipe |
// We keep adding the characters we
// traverse to a String s
// let flag = 0
// for (let ch of str) {
// 	if (ch === '"' && flag === 0) {
// 	flag = 1
// 	}
// 	else if (ch === '"' && flag == 1) flag = 0
// 	if (ch === ', ' && flag === 0) ch = '|'
// 	if (ch !== '"') s += ch
// }

// Split the string using pipe delimiter |
// and store the values in a properties array
// let properties = s.split("|")

// For each header, if the value contains
// multiple comma separated data, then we
// store it in the form of array otherwise
// directly the value is stored
for (let j in headers) {
	if (str[j].includes(";")) {
	obj[headers[j]] = str[j]
		.split(";").map(item => item.trim())
	}
	else {
        obj[headers[j]] = str[j]
        if (headers[j].toLowerCase() == "Description") obj["ExpenseType"] = expenseCategory(str[j].toLowerCase())
    }

}

if (obj["ExpenseType"] === undefined || obj["ExpenseType"] == "") obj["ExpenseType"] = expenseCategory(str[categoryColumnIndex].toLowerCase())

// Add the generated object to our
// result array
//obj["id"] = i;
result.push(obj)
//addItems(obj)
}

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(result);
//fs.writeFileSync('output.json', json);

batchOperation("Create", result);
// let testItems = addItems(result[1]);
// console.log(testItems.length)


function expenseCategory(keyword) {
    if (keyword.includes("food") || keyword.includes("grocery") || keyword.includes("rent") || keyword.includes("medical") || keyword.includes("cable") || keyword.includes("cellphone")
    || keyword.includes("bus") || keyword.includes("internet") || keyword.includes("hydro") || keyword.includes("haircut") || keyword.includes("gas") 
    || keyword.includes("insurance") || keyword.includes("car maintenance") || keyword.includes("parking") || isMedical(keyword))
        return "LivingCost";
    else if (keyword.includes("investment") || keyword.includes("savings") || keyword.includes("RRSP"))
        return "Savings";
    else if (keyword.includes("entertainment") || keyword.includes("netflix") || keyword.includes("disney+") || keyword.includes("hulu") || keyword.includes("spotify") 
    || keyword.includes("membership") || keyword.includes("recreation") || keyword.includes("gym") || keyword.includes("alcohol") || keyword.includes("take out") 
    || keyword.includes("subscription") || keyword.includes("gaming") || keyword.includes("hobbies") || keyword.includes("crunch"))
        return "Entertainment";
    else if(keyword.includes("credit card") || keyword.includes("master card") || keyword.includes("loans") || keyword.includes("mortage") || keyword.includes("interest"))
        return "Debt";
    else if(keyword.includes("uniqlo") || keyword.includes("wholesale") || keyword.includes("store") || keyword.includes("WMT"))
        return "Shopping";
    return "Others - Takeouts";
}

function isMedical(keyword) {
    if (keyword.includes("dentist") || keyword.includes("physiotherapy") || keyword.includes("dentist") || keyword.includes("physiotherapy") 
    || keyword.includes("chiropractor") || keyword.includes("chiropodist") || keyword.includes("accupuncture") 
    || keyword.includes("physchology") || keyword.includes("psychotherapy") || keyword.includes("dietitian") || keyword.includes("social worker") 
    || keyword.includes("massage therapy") || keyword.includes("hospital") || keyword.includes("emergency care")) return true;
    return false;
}