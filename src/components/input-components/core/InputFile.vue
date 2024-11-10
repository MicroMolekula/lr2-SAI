<script setup>
import {ref} from "vue";

const emit = defineEmits(['fileValue'])

function getFile(input) {
  let file = input.target.files[0]
  let reader = new FileReader();
  reader.readAsText(file)
  reader.onload = function () {
    emit('fileValue', reader.result)
  }
}
</script>

<template>
  <div class="mb-3">
    <label for="formFile" class="form-label">Выберите базу знаний</label>
    <input class="form-control" type="file" @change="getFile" accept=".txt">
  </div>
</template>

<style scoped>

</style>