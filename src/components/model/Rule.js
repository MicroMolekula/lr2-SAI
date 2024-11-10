import {Cond} from "@/components/model/Cond.js";
export class Rule {
    conds = []
    res = null

    constructor(conds, res) {
        this.conds = conds
        this.res = res
    }

    static ruleByString(str) {
        let arr = str.split(' то ')
        let condStr = arr[0].replace('если ', '')
        let condArr = condStr.split(' и ')
        return new Rule (
            condArr.map((condStr) => Cond.condByString(condStr)),
            Cond.condByString(arr[1])
        )
    }

    static rulesByString(str) {
        let base = str.toLowerCase()
        let arrRuleStr = base.split('\n')
        return arrRuleStr.map((ruleStr) => Rule.ruleByString(ruleStr))
    }
}