import { mapMutations } from 'vuex';

export default {
  name: 'copy-restore-table',

  props: ['cols', 'table'],

  data: function() {
    return {
      json: null,
      error: null,
    };
  },

  computed: {
    colsJSON() {
      return JSON.stringify(this.cols);
    },
  },

  methods: {
    ...mapMutations({
      restoreTable: 'restoreTable',
    }),

    /**
     * Скопируем json значений
     */
    copyJSON: function() {
      let textarea = document.querySelector('.js-table-json');
      textarea.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    },

    handleRestoreTable: function() {
      let options = {
        table: this.table,
        values: this.json,
      };

      try {
        JSON.parse(this.json);
      } catch (e) {
        console.error('Ошибка: невалидный json');
        this.error = 'Ошибка: невалидный json';
        return false
      }

      this.restoreTable(options);
      this.$emit('restored');
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.json = JSON.stringify(this.cols);
    });
  },
};
