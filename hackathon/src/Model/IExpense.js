import { stringify } from "@firebase/util";

export class IExpense {
    constructor(user, totalLivingCost, totalPersonal, totalSavings, totalDebt) {
        this.user = user;
        this.totalLivingCost = totalLivingCost;
        this.totalPersonal = totalPersonal;
        this.totalSavings = totalSavings;
        this.totalDebt = totalDebt;
    }
}

export class IExpenseCategories {
    constructor(name, subCategories) {
        this.name = name;
        this.subCategories = subCategories;
    }

    parseSubCategories() {
        return stringify.split(",")
    }
}