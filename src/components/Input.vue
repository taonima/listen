<template>
  <span class="listen_Input">
    <template v-if="prefix" >
      <Icon :name="prefix" class="prefix"/>
    </template>
    <input :type="type" :placeholder="placeholder" v-model="value" @input="onChange" :class="input_class"/>
    <template v-if="suffix" @click="suffixClick">
      <Icon :name="suffix" class="suffix" />
    </template>
  </span>
</template>

<script>
export default {
  name: 'Input',
  props: {
    v_value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'v_value',
    event: 'input'
  },
  data: () => {
    return {
      value: ''
    }
  },
  computed: {
    input_class: function () {
      let str = 'in'
      if (this.prefix) {
        str = `${str} prefix_input`
      }
      if (this.suffix) {
        str = `${str} suffix_input`
      }
      return str
    }
  },
  methods: {
    onChange: function (e) {
      this.$emit('input', e.target.value)
    },
    suffixClick: function () {
      this.$emit('suffixClick')
    }
  },
  watch: {
    v_value: function () {
      this.value = this.v_value
    }
  }
}
</script>

<style scoped lang="scss">
  .listen_Input {
    width: 210px;
    position: relative;
    .prefix {
      font-size: 19px;
      height: 18px;
      position: absolute;
      cursor: pointer;
      .svg-icon {
        position: relative;
        top: 2px;
      }
    }
    input {
      height: 22px;
      width: 100%;
      padding-left: 10px;
      &::-webkit-input-placeholder {
        color: #E5E5E5;
      }
    }
    .suffix {
      font-size: 19px;
      position: absolute;
      cursor: pointer;
      top: -3px;
      right: 3px;
    }
    .prefix_input {
      padding-left: 20px;
    }
    .suffix_input {
      padding-right: 20px;
    }
  }
</style>
