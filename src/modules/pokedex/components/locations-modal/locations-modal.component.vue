<template lang="html">
  <modal
    :closeModal="closeModal"
    :modalStatus="modalStatus"
  >
    <template>
      <div class="modal-location">
        <template v-if="locations && locations.length > 0">
          <span
            v-for="(location, index) in locations.slice(0, 20)"
            :key="location.location_area.name"
            class="modal-location__name"
          >
            {{ location.location_area.name.replaceAll('-', ' ') }}{{ format(index) }}
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
    locations: Array,
    closeModal: Function,
  },
  methods: {
    format(index) {
      if (index === 19) {
        return '...';
      }
      return ((index + 1) !== this.locations.length) ? ',' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-location {
    margin-top: 16px;
    &__name {
      color: #555c56;
      text-transform: uppercase;;
      font-weight: bold;
    }
  }
</style>
