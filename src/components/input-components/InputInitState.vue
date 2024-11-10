<script setup>
import {ref} from "vue";
import InputRule from "@/components/input-components/core/InputRule.vue";

const props = defineProps({
  conds: Object
})

const countInput = ref(1)
let conds = {}
let resCond = null

const emit = defineEmits(['initStateValue'])

function getCond(res) {
  conds[res.index] = res.cond
}

function getResCond(res) {
  resCond = res.cond
}

function deleteRule() {
  delete conds[countInput.value]
  countInput.value--
}

function getInitStateValue() {
  let res = {
    init: conds,
    target: resCond
  }
  emit('initStateValue', res)
}

</script>

<template>
  <div class="mb-3">
    <label for="init-state"><b>Введите начальное состояние</b></label>
    <div id="init-state" class="mb-3">
      <InputRule v-for="index in countInput" :conds="props.conds" :index="index" @cond-value="getCond"></InputRule>
    </div>
    <div class="mb-3 button__group">
      <button type="button" class="btn btn-primary" @click="() => countInput++">Добавить условие</button>
      <button type="button" class="btn btn-danger" :disabled="countInput === 1" @click="deleteRule">Удалить последнее условие</button>
    </div>
    <label for="target-state"><b>Введите целевое значение</b></label>
    <div id="target-state" class="mb-3">
      <InputRule :conds="props.conds" :index="0" @cond-value="getResCond"></InputRule>
    </div>
    <button type="button" class="btn btn-primary" @click="getInitStateValue">Запустить</button>
  </div>
</template>

<style scoped>
.button__group {
  display: flex;
  gap: 4px;
}

#init-state {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>