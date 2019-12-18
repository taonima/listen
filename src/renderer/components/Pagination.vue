<template>
  <div class="listen_pagination">
    <span @click="pageChange(1)" class="page_i">1</span>
    <span v-for="i in show_page" @click="pageChange(i)" class="page_i">
      {{i}}
    </span>
    <span @click="pageChange(max_page)" v-if="max_page > 1" class="page_i">{{max_page}}</span>
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
      pageChange: function (current) {
        console.log(current);
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
    .page_i {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
    }
  }
</style>
