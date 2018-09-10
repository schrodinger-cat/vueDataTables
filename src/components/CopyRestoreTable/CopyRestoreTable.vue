<template>
  <div>
    <textarea class="textarea js-table-json" v-model="json"></textarea>
    <div class="error" v-if="error">{{ error }}</div>
    <div>
      <button @click.prevent="copyJSON">Скопировать</button>
      <button @click.prevent="handleRestoreTable">Восстановить</button>
    </div>
  </div>
</template>

<script src="./CopyRestoreTable.js"></script>

<style lang="scss">
.textarea {
  width: 500px;
  height: 200px;
  border-radius: 5px;
}

.error {
  padding: 10px 0;
  color: red;
}
</style>

