<template>
  <div class="table__filter filter">
    <input 
      type="text" 
      class="filter__search"
      placeholder="Поиск"
      v-model="search" 
      @input="handleInputSearch" 
      @keyup.enter="initSearch"
    >

    <select class="filter__select" v-model="rowName">
      <option v-for="(row, index) in rows" :key="index">
        {{ row }}
      </option>
    </select>

    <a href="#" class="filter__reset" @click.prevent="clearSearch">Сбросить поиск</a>
  </div>
</template>

<script src="./TableFilter.js"></script>

<style lang="scss" scoped>
.filter {
  display: flex;
  margin-bottom: 15px;
  align-items: center;

  &__search {
    margin-right: 20px;
    width: 250px;
    height: 20px;
    padding-left: 10px;
    border: 1px solid #dadada;
    border-radius: 5px;
  }

  &__select {
    height: 20px;
    margin-right: 20px;
  }

  &__reset {
    color: #4286f4;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>


