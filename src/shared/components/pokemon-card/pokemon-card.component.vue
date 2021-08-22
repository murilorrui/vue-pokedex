<template lang="html">
  <div class="pokemon-card">
    <div class="pokemon-card-display-img grass">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="">
    </div>
    <h1>Picachu</h1>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="sass" scoped>
  .pokemon-card
    width: 120px
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.1)
    border-radius: 6px
    .normal
      background-color: #A8A878
    .fire
      background-color: #F57D31
    .water
      background-color: #6890F0
    .electric
      background-color: #F9CF30
    .grass
      background-color: #74CB48
    .ice
      background-color: #9AD6DF
    .ground
      background-color: #DEC16B
    .flying
      background-color: #A891EC
    .ghost
      background-color: #70559B
    .rock
      background-color: #B69E31
    .fighting
      background-color: #C12239
    .poison
      background-color: #A43E9E
    .psychic
      background-color: #F85888
    .bug
      background-color: #A8B820
    .dark
      background-color: #75574C
    .steel
      background-color: #B8B8D0
    .dragon
      background-color: #7037FF
    .pokemon-card-display-img
      box-shadow: 0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.1)
</style>
