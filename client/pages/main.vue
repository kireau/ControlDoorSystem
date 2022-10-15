<template>
  <v-container fluid>
    <main-table></main-table>
  </v-container>
</template>

<script>
import mainTable from "../components/mainTable.vue"

  export default {
    name: 'MainPage',
    components: {
      mainTable,
    },

  }
</script>
