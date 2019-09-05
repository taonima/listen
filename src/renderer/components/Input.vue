<template>
  <span class="listen_Input">
    <span v-if="prefix" class="prefix">
      <Icon :iconClass="prefix"/>
    </span>
    <input :type="type" :placeholder="placeholder" v-model="value" @change="onChange" :class="input_class"/>
    <span v-if="suffix" class="suffix" @click="suffixClick">
      <Icon :iconClass="suffix"/>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      placeholder: '',
      initValue: '',
      type: '',
      prefix: '',
      suffix: ''
    },
    data: () => {
      return {
        value: ''
      };
    },
    created() {
      this.value = this.initValue;
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
        this.$emit('onChange', e.target.value);
      },
      suffixClick: function () {
        this.$emit('suffixClick');
      }
    }
  };
</script>

<style scoped lang="scss">
  .listen_Input {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    width: 210px;
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
      align-self: flex-end;
      font-size: 12px;
      height: 18px;
      position: absolute;
      cursor: pointer;
      .svg-icon {
        position: relative;
        top: 2px;
      }
    }
    .prefix_input {
      padding-left: 20px;
    }
    .suffix_input {
      padding-right: 20px;
    }
  }
</style>
