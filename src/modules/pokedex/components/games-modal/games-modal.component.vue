<template lang="html">
  <modal
    :closeModal="closeModal"
    :modalStatus="modalStatus"
  >
    <template>
      <div class="modal-game">
        <template v-if="games && games.length > 0">
          <span
            v-for="(game, index) in games.slice(0, 10)"
            :key="game.version.name"
            class="modal-game__name"
          >
            {{ game.version.name.replaceAll('-', ' ') }}{{ format(index) }}
          </span>
        </template>
        <div v-else>
          <span class="modal-location__name">UNKNOWN</span>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/shared/components/modal/modal.component.vue';

export default {
  components: {
    Modal,
  },
  props: {
    modalStatus: Boolean,
    games: Array,
    closeModal: Function,
  },
  methods: {
    format(index) {
      if (index === 9) {
        return '...';
      }
      return ((index + 1) !== this.games.length) ? ',' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-game {
    margin-top: 16px;
    &__name {
      color: #555c56;
      text-transform: uppercase;;
      font-weight: bold;
    }
  }
</style>
