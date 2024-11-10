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
        let targetValue = null;
        if (this.checkIndex(this.getIndex(inputData.init, inputData.target))) {
            this.addFact(inputData.target)
            targetValue = this.getGtIndex(inputData.init)
            return this.upToDown(targetValue)
        }
        this.addInitStateInFacts(inputData.init)
        targetValue = inputData.target
        return this.upToDown(targetValue)
    }

    getIndex(init, target) {
        let initIndexes = [];
        let targetIndexes = null;
        for (let i = 0; i < this.rules.length; i++) {
            for (let stateIn in init) {
                if (this.rules[i].conds.some(o => o.target === init[stateIn].target && o.state === init[stateIn].state)) {
                    initIndexes.push(i)
                }
            }
            if (this.rules[i].conds.some(o => o.target === target.target && o.state === target.state)) {
                targetIndexes = i
            }
        }
        return {
            initIndexes,
            targetIndexes
        }
    }

    checkIndex(object) {
        for (let init of object.initIndexes) {
            if (init < object.targetIndexes) {
                return false
            }
        }
        return true
    }

    getGtIndex(init) {
        let initIndexes = 100000;
        let initMin = null;
        for (let i = 0; i < this.rules.length; i++) {
            for (let stateIn in init) {
                if (this.rules[i].conds.some(o => o.target === init[stateIn].target && o.state === init[stateIn].state)) {
                    if (i < initIndexes) {
                        initMin = init[stateIn]
                        initIndexes = i;
                    }
                }
            }
        }
        return initMin
    }

    upToDown(targetValue) {
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
                return [false, errorRule ? this.createErrorCond(errorRule) : null]
            }
        }
    }
}