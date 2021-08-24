<template lang="html">
  <div id="myModal" class="modal" v-if="modalStatus">
    <div class="modal-content">
      <span
        @click="closeModal"
        class="close"
      >
        &times;
      </span>
      <div class="">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalStatus: Boolean,
    closeModal: Function,
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 6;
    outline: none;
  }

  .modal-content {
    border-radius: 8px;
    background: #f5efe9;
    border: 4px solid #a7a8a2;
    box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
    color: #555c56;
    margin: 15% auto;
    padding: 20px;
    width: 70%;
    position: relative;
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 16px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
