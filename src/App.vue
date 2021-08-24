<template>
  <div
    class="main"
    :style="{ minWidth: getWidth }"
  >
    <div id="nav">
      <app-header/>
    </div>
    <div class="container">
      <div class="border-inset">
        <div id="app">
          <router-view id="router-link"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './shared/components/layout/header/header.component.vue';

export default {
  components: {
    AppHeader,
  },
  computed: {
    getWidth() {
      const { innerWidth } = window;
      return innerWidth > 425 ? '425px' : `${innerWidth - 20}px`;
    },
  },
};
</script>

<style lang="scss">
  html {
    background-image: url('./assets/background.jpg');
  }

  body {
    margin: 0;
  }

  .main {
    border: 0;
    display: block;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 425px;
    background: #ca314a;
    box-shadow: 3px 3px 0px 0 #b7284c;
    border-radius: 8px;
  }

  .container {
    padding: 20px;
  }

  .border-inset {
    border: 20px solid #f5efe9;
    border-radius: 8px;
    box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
  }

  #router-link {
    background: #edf9fb;
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 33rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    position: relative;
    scrollbar-width: none;
    border: 5px inset #8a847e;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  #nav {
    height: 90px
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

</style>
