<template>
  <div class="table">
    <table-filter 
      :rows="tableData.rows" 
      @search="handleSearch" 
      @clear="clearSearch"
    ></table-filter>

    <table class="table__elem">
      <thead>
        <th class="table__th _add"></th>
        <th 
          v-for="(row, rowIndex) in tableData.rows" 
          :key="rowIndex" 
          @click.prevent="handleSort(row)"
          class="table__th"
        >
          {{ row }}
          <span v-if="sorting.field == row">
            {{ rowDirection }}
          </span>
        </th>
      </thead>
      <tbody>
        <tr 
          v-for="(valueRow, valueRowIndex) in getTableValuesPerPage(tableData.values, tableData.page)" 
          :key="valueRowIndex"
          class="table__tr"
        >
          <td class="table__td">
            <a href="#" class="table__add-col" @click.prevent="addColumn(valueRowIndex)">+</a>
          </td>
          <td 
            v-for="(value, valueIndex) in valueRow" 
            :key="valueIndex"
            class="table__td"
            @dblclick="openEdit(valueRowIndex, valueIndex)"
          >
            <input 
              type="text" 
              v-if="checkIfColumnEditable(valueRowIndex, valueIndex)"
              v-model="edit.value"
              @keyup.esc="cancelEdit"
              @keyup.enter.prevent="saveEdit(valueRowIndex, valueIndex)"
            >
            <template v-else>
              {{ checkTypeOfValue(value) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="table__pagination">
      <div 
        class="table__page" 
        v-for="page in getPagesCount(tableData.values)" 
        :key="page"
        :class="checkActivePage(page)"
        @click.prevent="handleSetPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script src="./Table.js"></script>

<style lang="scss" scoped>
.table {
  margin-top: 40px;

  &__elem {
    width: 100%;
    border-collapse: collapse;
  }

  &__th {
    padding: 10px;
    border-bottom: 1px solid #000;
    text-align: center;

    &._add {
      width: 20px;
    }
  }

  &__tr {
    &:nth-child(even) {
      .table__td {
        background-color: #dadada;
      }
    }

    &:hover {
      .table__add-col {
        display: flex;
      }
    }
  }

  &__td {
    padding: 8px;
    text-align: center;
  }

  &__add-col {
    display: none;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    background-color: #56d64d;
    font-weight: bold;
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
  }

  &__pagination {
    padding-top: 20px;
  }

  &__page {
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;

    &._active {
      border: 1px solid #4286f4;
      border-radius: 50%;
    }
  }
}
</style>

