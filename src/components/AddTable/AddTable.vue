<template>
  <div class="add">
    <div class="add__elem">
      <label for="id_fields">Название столбцов таблицы (через запятую)</label>
      <input type="text" id="id_fields" class="add__input" v-model="fields">
    </div>

    <div class="add__elem">
      <label for="id_cols">Количество сток в таблице</label>
      <input type="number" id="id_cols" min="1" class="add__input" v-model="cols">
    </div>

    <div class="add__elem">
      <label for="id_meta">Три класса для стилизации заголовка, четной строки и нечетной строки (через запятую)</label>
      <input type="text" id="id_meta" class="add__input" v-model="meta">
    </div>

    <button @click.prevent="handleAddTable">Добавить таблицу</button>
  </div>
</template>

<script src="./AddTable.js"></script>

<style lang="scss">
.add {
  &__elem {
    margin-bottom: 20px;
  }

  &__input {
    display: block;
    margin-top: 10px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>

