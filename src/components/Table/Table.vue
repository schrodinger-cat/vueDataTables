<template>
  <div class="table">
    <table-filter :rows="tableData.rows" @search="handleSearch" @clear="clearSearch"></table-filter>
    <table>
      <thead>
        <th v-for="(row, rowIndex) in tableData.rows" :key="rowIndex" @click.prevent="handleSort(row)">
          {{ row }}
          <span v-if="sorting.field == row">
            {{ rowDirection }}
          </span>
        </th>
      </thead>
      <tbody>
        <tr v-for="(valueRow, valueRowIndex) in getTableValuesPerPage(tableData.values, tableData.page)" :key="valueRowIndex">
          <td v-for="(value, valueIndex) in valueRow" :key="valueIndex">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="table__pagination">
      <div 
        class="table__page" 
        v-for="page in getPagesCount(table.values)" 
        :key="page"
        @click.prevent="handleSetPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script src="./Table.js">
</script>
