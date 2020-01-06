<template>
  <div class="listen_pagination" v-if="total">
    <span @click="pageChange(1)" :class="page_class(1)">1</span>
    <span v-if="show_page[0] && (show_page[0] - 1) > 1" class="page_i">···</span>
    <span v-for="i in show_page" @click="pageChange(i)" :key="i" :class="page_class(i)">
      {{i}}
    </span>
    <span v-if="show_page[4] && (show_page[4] + 1) < max_page" class="page_i">···</span>
    <span @click="pageChange(max_page)" v-if="max_page > 1" :class="page_class(max_page)">{{max_page}}</span>
  </div>
</template>

<script>
  import { empty } from '@/utils';
  export default {
    name: 'Pagination',
    props: {
      page: {
        type: Object,
        required: true,
        default: function () {
          return {total: 0, current: 1, pageSize: 10};
        }
      }
    },
    computed: {
      pageStr() {
        return `${this.page.total}${this.page.current}${this.page.pageSize}`;
      },
      total() {
        return this.page.total;
      },
      current() {
        return this.page.current;
      },
      pageSize() {
        return this.page.pageSize;
      },
      max_page() {
        return Math.ceil(this.page.total / this.page.pageSize) || 1;
      },
      show_page() {
        if (empty(this.page)) {
          return [];
        }
        let arrLength = this.max_page - 2;
        if (arrLength > 5) {
          arrLength = 5;
        } else if (arrLength >= 1) {
          return new Array(arrLength).fill('').map((i, k) => {
            return k + 2;
          });
        } else {
          return [];
        }
        let arr = [this.current - 2, this.current - 1, this.current, this.current + 1, this.current + 2];
        if (arr[0] - 1 <= 0) {
          arr = arr.map(i => {
            return i + Math.abs(arr[0] - 1) + 1;
          });
        }
        if (arr[4] - this.max_page >= 0) {
          arr = arr.map(i => {
            return i - Math.abs(arr[4] - this.max_page) - 1;
          });
        }
        return arr;
      }
    },
    methods: {
      page_class(page) {
        if (page === this.current) {
          return 'page_i page_i_active';
        }
        return 'page_i';
      },
      pageChange: function (current) {
        this.$emit('pageChange', current);
      }
    },
    watch: {
      pageStr() {

      }
    }
  };
</script>

<style scoped  lang="scss" >
  .listen_pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    .page_i {
      cursor: pointer;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
    }
    .page_i_active {
      color: #C77373;
    }
  }
</style>
