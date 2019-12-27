<template>
  <span class="listen_Input">
    <span v-if="prefix" class="prefix">
      <Icon :iconClass="prefix"/>
    </span>
    <input :type="type" :placeholder="placeholder" v-model="value" @input="onChange" :class="input_class"/>
    <span v-if="suffix" class="suffix" @click="suffixClick">
      <Icon :iconClass="suffix"/>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      v_value: '',
      placeholder: '',
      type: '',
      prefix: '',
      suffix: ''
    },
    model: {
      prop: 'v_value',
      event: 'input'
    },
    data: () => {
      return {
        value: ''
      };
    },
    computed: {
      input_class: function () {
        let str = 'in';
        if (this.prefix) {
          str = `${str} prefix_input`;
        }
        if (this.suffix) {
          str = `${str} suffix_input`;
        }
        return str;
      }
    },
    methods: {
      onChange: function (e) {
        this.$emit('input', e.target.value);
      },
      suffixClick: function () {
        this.$emit('suffixClick');
      }
    },
    watch: {
      v_value: function () {
        this.value = this.v_value;
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_Input {
    width: 210px;
    position: relative;
    .prefix {
      color: #7D7D7D;
      font-size: 12px;
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
      color: #7D7D7D;
      font-size: 20px;
      height: 18px;
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
