<template>
  <div class="row">
    <div class="col s12">
      <div class="input-field"
           :class="{ invalid: invalid }">
        <select
            v-bind="$attrs"
            id="email_inline"
            class="validate invalid"
            ref="select" v-model="model">
          <slot></slot>
        </select>
        <label>{{ label }}</label>
        <span v-if="errorText" class="helper-text">{{errorText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
  name: 'm-select',
  mixins: [inputMixin],
  props: {
    value: {
      required: true,
      type: [String, Number, Array],
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss" scoped>
.helper-text {
  color: #F44336;
}
</style>
