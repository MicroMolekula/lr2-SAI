export class Cond {
    title = null
    state = null

    constructor(title, state) {
        this.title = title
        this.state = state
    }

    static condByString(str) {
        let arr = str.split('=')
        return new Cond(
            arr[0].trim(),
            arr[1].trim()
        )
    }

    static getAllCondValue(ruleArr) {
        let allCondArr = {}
        for (let rule of ruleArr) {
            for (let cond of rule.conds) {
                allCondArr[cond.title] = []
            }
            allCondArr[rule.res.title] = []
        }
        for (let rule of ruleArr) {
            for (let cond of rule.conds) {
                allCondArr[cond.title].push(cond.state)
            }
            allCondArr[rule.res.title].push(rule.res.state)
        }
        for (let cond in allCondArr) {
            allCondArr[cond] = [...new Set(allCondArr[cond])]
        }
        return allCondArr
    }
}