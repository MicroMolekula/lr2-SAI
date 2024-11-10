<script setup>
import {onBeforeUpdate, ref} from "vue";

const props = defineProps({
  baseData: String
})
const refactorBaseData = ref('');
onBeforeUpdate(() => {
  if (props.baseData) {
    refactorBaseData.value = props.baseData.replace(/\n/g, '<br/>')
  }
})
</script>

<template>
  <div class="base mb-3">
    <div v-html="refactorBaseData">
    </div>
  </div>
</template>

<style scoped>
.base {
  height: 200px;
  overflow: auto;
  border: 2px solid;
  border-radius: 4px;
  padding: 2px;
}
</style>