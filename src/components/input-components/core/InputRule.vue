<script setup>
import {onBeforeUpdate, ref} from "vue";
import {Cond} from "@/components/model/Cond.js";

const props = defineProps({
  conds: Object,
  index: Number
})

const emit = defineEmits(['condValue'])
const titleValue = ref(null)
const stateValue = ref(null)

const keys = ref([])

function getKeys(conds) {
  for (let key in conds) {
    keys.value.push(key)
  }
  return [... new Set(keys.value)]
}

function getTitleValue(event) {
  titleValue.value = event.target.value !== 'Выберите значение...' ? event.target.value : null;
}

function getStateValue(event) {
  stateValue.value = event.target.value !== 'Выберите значение...' ? event.target.value : null;
  if (stateValue) {
    let cond = new Cond(
        titleValue.value,
        stateValue.value
    )
    let resultEmit = {
      index: props.index,
      cond: cond
    }
    emit('condValue', resultEmit)
  }
}
</script>

<template>
  <div class="rule">
    <select class="form-select" aria-label="Default select example" @change="getTitleValue">
      <option selected>Выберите значение...</option>
      <option v-for="key in getKeys(props.conds)" :value="key">{{ key }}</option>
    </select>
    <select class="form-select" aria-label="Default select example" :disabled="!titleValue" @change="getStateValue">
      <option selected>Выберите значение...</option>
      <option v-for="key in props.conds[titleValue]" :value="key">{{ key }}</option>
    </select>
  </div>
</template>

<style scoped>
.rule {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>