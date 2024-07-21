#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
// Making Bank Account Class
class Bank {
    accountNumber;
    balance;
    constructor(accountNum, balance) {
        (this.accountNumber = accountNum), (this.balance = balance);
    }
    // withdraw cash
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.bgWhite.black(`you have successfully withdraw ${chalk.red("$" + amount)} your remaining balance is ${chalk.green("$" + this.balance)}`));
        }
        else {
            console.log(chalk.bgRed.white(`You have insufficient blance`));
        }
    }
    // Cash Deposit
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $ 1 fee charged if more than $ 100 is deposit
        }
        this.balance += amount;
        console.log(chalk.bgWhite.black(`You have successfully deposited ${chalk.green("$" + amount)} Your current balance is ${chalk.green("$" + this.balance)}`));
    }
    // Check Balance
    checkBalance() {
        console.log(chalk.bgWhite.black(`Your current balance is ${chalk.green("$" + this.balance)}`));
    }
}
// Making Customer Class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNum;
    accountNum;
    constructor(firstName, lastName, age, gender, mobileNum, accountNum) {
        (this.firstName = firstName),
            (this.lastName = lastName),
            (this.age = age),
            (this.gender = gender),
            (this.mobileNum = mobileNum),
            (this.accountNum = accountNum);
    }
}
// Create Bank Accounts
const accounts = [
    new Bank(1001, 500),
    new Bank(1002, 1000),
    new Bank(1003, 2000),
];
// Create Customers
const customers = [
    new Customer("Huzaifa", "Ayub", 28, "Male", 3102939848, accounts[0]),
    new Customer("Eric", "James", 29, "Male", 345098234, accounts[1]),
    new Customer("Maha", "Khan", 26, "Female", 3894582341, accounts[2]),
];
// Function to start Program
async function myBank() {
    do {
        const accNum = await inquirer.prompt([
            {
                name: "enterAccountNum",
                type: "number",
                message: "Please Enter Your Account Number:",
            },
        ]);
        const customer = customers.find((customer) => customer.accountNum.accountNumber === accNum.enterAccountNum);
        if (customer) {
            console.log(chalk.bgWhite.red(`Welcome ${customer.firstName} ${customer.lastName}`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Please select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depsitAmount = await inquirer.prompt({
                        name: "Amount",
                        type: "number",
                        message: "Please Enter Your Amount Here",
                    });
                    customer.accountNum.deposit(depsitAmount.Amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "WithAmount",
                        type: "number",
                        message: "Please Enter Your Amount Here",
                    });
                    customer.accountNum.withdraw(withdrawAmount.WithAmount);
                    break;
                case "Check Balance":
                    customer.accountNum.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting....");
                    console.log(chalk.bgWhite.red("\n Thankyou for choosing our Bank Services. Have a great day."));
                    return;
            }
        }
        else {
            console.log(chalk.bgRed.white("Invalid Account Number"));
        }
    } while (true);
}
//Invoking function
myBank();
