<template>
  <div class="row">
    <div class="col s12">
      <div class="input-field">
        <input type="text"
               class="datepicker"
               ref="picker"
               :class="{ invalid: invalid }"
               v-model="model"
        >
        <label class="active">{{ label }}</label>
        <span v-if="errorText" class="helper-text" :data-error="errorText"></span>
      </div>
    </div>
  </div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
  name: 'm-picker',
  mixins: [inputMixin],
  props: {
    value: {
      required: true,
      type: [String, Number, Array],
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.Datepicker.init(this.$refs.picker, {
      format: 'yyyy-mm-dd',
      onClose: () => {
        this.model = this.$refs.picker.value;
      },
    });
  },
};
</script>
