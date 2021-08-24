<template lang="html">
  <modal
    :closeModal="closeModal"
    :modalStatus="modalStatus"
  >
    <template>
      <div
        v-for="evolution in evolutions"
        :key="evolution.name"
        class="modal-evolution"
      >
        <div class="modal-evolution__display-img">
          <img
          class="modal-evolution__img"
          :src="evolution.sprites.front_default"
          >
        </div>
        <p class="modal-evolution__name">{{ evolution.name }}</p>
      </div>
    </template>
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
    evolutionsNames: Array,
    evolutions: Array,
    closeModal: Function,
  },
};
</script>

<style lang="scss" scoped>
  .modal-evolution {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &__name {
      color: #555c56;
      letter-spacing: 3px;
      text-transform: uppercase;;
      font-weight: bold;
    }
  }
</style>
