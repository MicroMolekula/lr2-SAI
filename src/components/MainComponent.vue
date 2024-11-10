<script setup>
import {onBeforeUpdate, ref, toRaw} from "vue";
import InputFile from "@/components/input-components/core/InputFile.vue";
import BaseView from "@/components/view/BaseView.vue";
import {Rule} from "@/components/model/Rule.js";
import {Cond} from "@/components/model/Cond.js";
import InputInitState from "@/components/input-components/InputInitState.vue";
import {ExpertSystem} from "@/components/model/ExpertSystem.js";
import ResultView from "@/components/view/ResultView.vue";

const fileValue = ref('')
let rules = ref([])
const result = ref([null, null])


function getRules(value) {
  fileValue.value = value
  rules.value = Rule.rulesByString(fileValue.value)
}

function start(stateValue) {
  if (rules.value === []) {
    return null
  }
  let expertSystem = new ExpertSystem(toRaw(rules.value))
  result.value = expertSystem.run(stateValue)
  expertSystem = null
}

</script>

<template>
  <InputFile @file-value="getRules"></InputFile>
  <BaseView :base-data="fileValue"></BaseView>
  <InputInitState :conds="Cond.getAllCondValue(rules)" @init-state-value="start"></InputInitState>
  <ResultView :res="result"></ResultView>
</template>

<style scoped>

</style>