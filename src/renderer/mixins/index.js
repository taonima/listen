// import * as utils from '@/utils';
import { empty } from '@/utils';

export default {
  data: () => {
    return {};
  },
  computed: {
    account: function () {
      if (empty(this.$store.state.User.account)) {
        return this.$store.state.User.account;
      }
      return {};
    },
    profile: function () {
      if (!empty(this.$store.state.User.profile)) {
        return this.$store.state.User.profile;
      }
      return {};
    },
    bindings: function () {
      if (empty(this.$store.state.User.bindings)) {
        return this.$store.state.User.bindings;
      }
      return {};
    },
    user_status: function () {
      return !empty(this.profile);
    }
  }
};
