export class ExpertSystem {
    facts = {}
    rules = []

    constructor(rules) {
        this.rules = rules
    }

    addInitStateInFacts(initState) {
        for (let state in initState) {
            this.facts[initState[state].title] = initState[state].state
        }
    }

    checkCond(cond) {
        return this.facts[cond.title] === cond.state
    }

    addFact(cond) {
        this.facts[cond.title] = cond.state
    }

    checkRule(rule) {
        for (let cond of rule.conds) {
            if (!this.checkCond(cond)) {
                return false
            }
        }
        return true
    }

    checkExitFact(cond) {
        return this.facts[cond.title] !== undefined
    }

    createErrorCond(rule) {
        for (let cond of rule.conds) {
            if (!this.checkCond(cond)) {
                if (this.facts[cond.title] === undefined) {
                    return cond.title
                }
            }
        }
        return null
    }

    run(inputData) {

        this.addInitStateInFacts(inputData.init)
        let targetValue = inputData.target
        let newFactInferred = true
        let errorRule = null
        let startFlag = false
        while (newFactInferred) {
            newFactInferred = false
            for (let rule of this.rules) {
                if (this.checkRule(rule) && !this.checkExitFact(rule.res)) {
                    this.addFact(rule.res)
                    if (this.checkCond(targetValue)) {
                        return [true, this.facts]
                    }
                    newFactInferred = true
                    startFlag = true
                } else {
                  if (startFlag) {
                      errorRule = rule
                      startFlag = false
                  }
                }
            }

            if (!newFactInferred) {
                return [false, this.createErrorCond(errorRule)]
            }
        }
    }

}