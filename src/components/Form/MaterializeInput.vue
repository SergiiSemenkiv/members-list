<template>
  <div class="row">
    <div class="col s12">
      <div class="input-field">
        <input :type="inputType" v-model="model" :class="{ invalid: invalid }">
        <label :class="activeClass"> {{ label }} </label>
        <span v-if="errorText" class="helper-text" :data-error="errorText"></span>
      </div>
    </div>
  </div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
  name: 'm-input',
  mixins: [inputMixin],
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
  },
};
</script>
