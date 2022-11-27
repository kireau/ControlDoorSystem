<template>

</template>

<script>
export default {
  name: 'IndexPage',

  mounted () {
    this.$nuxt.$options.router.push({path: '/main'})
  },
}
</script>
