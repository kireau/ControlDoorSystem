<template>
  <v-card>
    <v-card-title class="text-h5">Редактировать пользователя {{ itemData.name }}?</v-card-title>
    <v-card-text>
      <edit-form></edit-form>
    </v-card-text>

    <v-btn color="blue darken-1" text >OK</v-btn>
  </v-card>
</template>

<script>
  import EditForm from './createForm.vue'

  export default {
    props: {
      itemData: Object,
    },

    components: {
      EditForm,
    },

    name: 'EditItem',

    data() {
      return {
        // accessItem: this.accessData,

        // editedItem: {
        //   userId: this.itemData.userID,
        //   name: this.itemData.name,
        //   login: '',
        //   password: '',
        //   chip: '',
        //   doors: [],
        // },
      }
    },

    methods: {

    },

    computed: {
      // accessData() {
      //   let resultData = this.itemData
      //   delete resultData.name
      //   delete resultData.userID
      //   return  resultData
      // }
    },

    async mounted () {
      // const userLogin = await this.$axios.$get(`http://localhost:3666/api/user/edit/${this.editedItem.userId}`)
      // console.log(userLogin)
      // this.editedItem.login = userLogin[0].login
      // this.editedItem.password = userLogin[0].password
    },
  }
</script>

