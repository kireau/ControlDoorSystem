<template>
  <v-card>
    <v-card-title class="text-h5">Редактировать пользователя "{{ itemData.name }}" ?</v-card-title>
    <v-card-text>
      <form-base :userRow="this.itemData"></form-base>
      {{ this.itemData }}
    </v-card-text>
    <v-card-actions class="justify-center mt-3 pb-5">
        <v-btn
          class="green"
          elevation="1"
        >
          Подтвердить
        </v-btn>
        <v-btn
          class="ml-5 red"
          elevation="1"
        >
          Отмена
        </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import FormBase from './formBase.vue'

  export default {
    props: {
      itemData: Object,
    },

    components: {
      FormBase,
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

