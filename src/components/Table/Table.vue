<template>
  <div class="table">
    <div class="table__elem" v-for="(table, tableIndex) in tablesList" :key="tableIndex">
      <table v-if="!table.isPending">
        <thead>
          <th v-for="(row, rowIndex) in table.rows" :key="rowIndex">
            {{ row }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(valueRow, valueRowIndex) in getTableValuesPerPage(table.values, table.page)" :key="valueRowIndex">
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
          @click.prevent="handleSetPage(page, tableIndex)"
        >
          {{ page }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Table.js">
</script>
