<template>
  <thead>
  <tr>
    <th v-for="filter in filters"
        :key="filter.key">
      <input type="text"
             v-if="filter.filtered"
             :value="filter.value"
             @input="filterChanged(filter.key, $event.target.value)"
             :placeholder="filter.title">
    </th>
  </tr>
  </thead>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
    },
  },
  methods: {
    filterChanged(key, value) {
      this.$emit('filter-changed', {
        key,
        value,
      });
    },
  },
};
</script>
