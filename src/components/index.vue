<template>
  <div class="hello">
    <ul>
      <li>
        <router-link :to="{path: 'scrolllist'}">scroll_list</router-link>
      </li>
      <li>
        <router-link :to="{path: 'indexList'}">indexList</router-link>
      </li>
      <li>
        <router-link :to="{path: 'pullDownOrUp'}">pullDownOrUp</router-link>
      </li>
      <li>
        <router-link :to="{path: 'swiper'}">swiper</router-link>
      </li>
      <li>
        <router-link :to="{path: 'selectOptions'}">selectOptions</router-link>
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./../common/sass/var.scss";

    ul {
      li {
        height: 30px;
        line-height: 30px;
        padding: 0 0 0 10px;
        border-bottom: 1px solid $borderColor;
        a {
          display: block;
          width: $percent;
        }
      }
    }
    
</style>
