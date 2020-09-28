<template>
  <div>
    {{ displayedTitle }}
    <div class="secondary-content">
      <slot>
        {{ displayedValue  }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [Array, String, Number],
      default: '',
    },
  },
  computed: {
    displayedTitle() {
      return this.title.trim();
    },
    displayedValue() {
      if (Array.isArray(this.value)) {
        return this.value.join(' ,');
      }
      return this.value;
    },
  },

};
</script>
