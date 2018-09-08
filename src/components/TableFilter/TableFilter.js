import _ from 'lodash';

export default {
  name: 'table-filter',

  props: ['rows'],

  data: function() {
    return {
      rowName: null,
      search: null,
    };
  },

  methods: {
    /**
     * Сделаем задержку в 300мс перед фильтрацией
     */
    handleInputSearch: _.debounce(function() {
      this.initSearch();
    }, 300),

    /**
     * Вернём событие поиска в Table.vue
     */
    initSearch: function() {
      let searchConfig = {
        search: this.removeWhitespace(this.search),
        row: this.rowName
      }

      this.$emit('search', searchConfig)
    },

    /**
     * Убеерём пробелы в начале и конце строки
     * @param {*} string - поисковая строка
     */
    removeWhitespace: function(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },

    clearSearch: function() {
      this.$emit('clear');
    }
  },

  mounted() {
    if(this.rows) {
      this.$nextTick(() => {
        this.rowName = this.rows[0];
      });
    }
  }
};
