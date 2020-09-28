<template>
  <div class="row">
    <div class="col s6">
      <ul class="pagination">
        <li class="waves-effect"
            :class="{active: page === currentPage }"
            v-for="page in pages" :key="page"
        >
          <a href="#!" @click.prevent="onPageClick(page)">{{ page }}</a>
        </li>
      </ul>
    </div>
    <div class="col s3 offset-s3">
      <select
          class="browser-default"
          :value="perPage"
          @input="perPageChanged($event.target.value)"
      >
        <option v-for="option in perPageOptions" :key="option">{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    itemsLength: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      perPageOptions: [2, 5, 10],
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.itemsLength / this.perPage);
    },
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    },
    onPageClick(page) {
      this.changePage(page);
    },
    perPageChanged(value) {
      this.$emit('per-page-changed', value);
    },
  },
  watch: {
    itemsLength() {
      if (this.perPage > 1 && this.itemsLength <= this.perPage) {
        this.changePage(1);
      }
    },
  },
};
</script>
