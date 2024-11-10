<script setup>
const props = defineProps({
  res: Array
})
</script>

<template>
  <div v-if="props.res[0]" class="res">
    <div v-for="(res, key) in props.res[1]">{{key}} = {{res}}</div>
  </div>
  <div v-else-if="props.res[0] !== null">
    <div v-if="props.res[1] === null">
      <div>Целевое значение не достижимо</div>
    </div>
    <div v-else>
      <div>Не удалось достичь целевого значения</div>
      <div v-if="props.res[1]">Задайте значение для "{{ props.res[1] }}"</div>
    </div>
  </div>
</template>

<style scoped>
.res {
  display: flex;
  flex-direction: column;
}
</style>