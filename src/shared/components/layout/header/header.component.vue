<template>
  <div class="panel">
    <div class="container">
      <header-leds v-bind="primaryButton" />
      <header-leds v-for="(button, index) in buttons" :key="index" v-bind="button" />
    </div>
  </div>
</template>

<script>
import HeaderLeds from './header-leds.component.vue';

export default {
  components: {
    HeaderLeds,
  },
  data() {
    return {
      primaryButton: { style: { width: '50px', height: '50px' }, class: 'bg__blue-00' },
      buttons: [
        {
          style: {
            boxShadow: 'none',
            border: '3px solid #b7284c',
            width: '20px',
            height: '20px',
          },
          class: 'bg__red',
        },
        {
          style: {
            boxShadow: 'none',
            border: '3px solid #b7284c',
            width: '20px',
            height: '20px',
          },
          class: 'bg__yellow',
        },
        {
          style: {
            boxShadow: 'none',
            border: '3px solid #b7284c',
            width: '20px',
            height: '20px',
          },
          class: 'bg__green',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 41px, 270px 41px, 200px 100%, 0 100%);
  z-index: 1;
  border-radius: 8px;
  background: #b7284c;
  .container {
    display: flex;
    padding: 10px;
    align-items: flex-start;
    height: 75px;
    clip-path: polygon(0 0, 100% 0, 100% 38px, 270px 38px, 200px 72px, 0 72px);
    background: #e7405c;
    border-radius: 8px;
  }
}
</style>
