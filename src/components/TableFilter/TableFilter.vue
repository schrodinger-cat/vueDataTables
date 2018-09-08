<template>
  <div class="table__filter">
    <input type="text" v-model="search" @input="handleInputSearch" @keyup.enter="initSearch">

    <select v-model="rowName">
      <option v-for="(row, index) in rows" :key="index">
        {{ row }}
      </option>
    </select>

    <a href="#" @click.prevent="clearSearch">Сбросить поиск</a>
  </div>
</template>

<script src="./TableFilter.js"></script>

