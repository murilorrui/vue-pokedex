<template lang="html">
  <modal :modalStatus="modalStatus">
  </modal>
</template>

<script>
import Modal from '@/shared/components/layout/modal/modal.component.vue';

export default {
  components: {
    Modal,
  },
  props: {
    modalStatus: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>
