<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <h5 class="card-title">{{ title }}</h5>
          <table class="table highlight">
            <ListFilter :filters="normalizedHeaders"
                        @filter-changed="onFilterChanged"/>
            <thead>
            <tr>
              <th v-for="header in normalizedHeaders"
                  :key="header.title">
                {{ header.title }}
              </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in displayedItems"
                  :key="rowIndex"
                  class="row-clickable"
                  @click="rowClicked(row)"
              >
                <td v-for="(column, columnIndex) in columns"
                    :key="columnIndex"
                >
                  {{ row[column.key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content">
          <ListPagination
              :items-length="filteredItemsLength"
              :current-page="page"
              :per-page="itemsPerPage"
              @per-page-changed="onPerPageChanged"
              @page-changed="onPageChanged" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ToDo make slots
// @ToDo make validation on key exist
// @ToDo add diff types of filters objects

import ListPagination from '@/components/List/ListPagination.vue';
import ListFilter from '@/components/List/ListFilter.vue';

export default {
  name: 'list',
  components: { ListFilter, ListPagination },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    items: {
      type: [Array, Object],
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 5,
      filters: [],
      normalizedHeaders: [],
    };
  },
  computed: {
    list() {
      if (Array.isArray(this.items)) {
        return this.items;
      }
      return Object.values(this.items);
    },
    filteredData() {
      // eslint-disable-next-line no-shadow
      return this.list.reduce((filteredData, item) => {
        const isPassedFilters = this.normalizedHeaders.every((fl) => this.passFilter(item, fl));
        if (isPassedFilters) {
          filteredData.push(item);
        }
        return filteredData;
      }, []);
    },
    filteredItemsLength() {
      return this.filteredData.length;
    },
    displayedItems() {
      return this.paginate(this.filteredData);
    },
  },
  created() {
    this.normalizeHeaders();
  },
  methods: {
    onFilterChanged({ key, value }) {
      const header = this.normalizedHeaders.find((h) => h.key === key);
      header.value = value;
    },
    onPageChanged(page) {
      this.page = page;
    },
    onPerPageChanged(value) {
      this.itemsPerPage = Number(value);
    },
    paginate(posts) {
      // @ToDo add pagination as option
      const { page, itemsPerPage } = this;
      const from = (page * itemsPerPage) - itemsPerPage;
      const to = (page * itemsPerPage);
      return posts.slice(from, to);
    },
    passFilter(item, filter) {
      if (filter.value === null
          || filter.value === undefined
          || filter.value.length === 0) {
        return true;
      }
      const value = item[filter.key];

      if (value !== null && value !== undefined) {
        if (value.toString().toLowerCase().includes(filter.value.toString().toLowerCase())) {
          return true;
        }
      }

      return false;
    },
    rowClicked(item) {
      this.$emit('list-row-clicked', item);
    },
    normalizeHeaders() {
      this.normalizedHeaders = this.columns.map((header) => ({ ...{ value: '', filtered: true }, ...header }));
    },
  },
};
</script>

<style lang="scss">
.row-clickable {
  cursor: pointer;
}
</style>
