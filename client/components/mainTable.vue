<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      loading="true"
    >
      <template v-slot:item.actions="{ item }"
      >
        <v-icon
          small
          @click="deleteRow(item)">
          mdi-delete
        </v-icon>
      </template>
</v-data-table>
      <template>

          <v-rows justify="center">
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Удалить пользователя {{ editedUser.name }}?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="confirmDelete">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-rows>

      </template>


  </v-container>
</template>

<script>
  export default {
    name: 'MainTable',
    data() {
      return {
        headers: [],
        items: [],

        dialogDelete: false,
        editedUser: {
          name: '',
          id: '',
          index: '',
        }
      }
    },

    watch: {
      dialogDelete(val) {
        val || this.closeDelete()
      },

      items(newItems, oldItems) {
        console.log(newItems)
      }
    },

    methods: {
      deleteRow(userID) {
        this.dialogDelete = true
        this.editedUser.index = this.items.indexOf(userID)
        this.editedUser.name = userID.name
        this.editedUser.id = userID.userID
        // console.log(userID.userID)
      },

      closeDelete() {
        this.dialogDelete = false
        this.editedUser.name = ''
        this.editedUser.id = ''
      },
      async confirmDelete() {
        try {
          await this.$axios.$delete(`http://localhost:3666/api/user/${this.editedUser.id}`)
          this.items.splice(this.editedUser.index, 1)
          this.closeDelete()
        } catch (error) {
          alert('Что-то пошло не так...')
          this.closeDelete()
        }

      }
    },
    async mounted () {
      const tableData = await this.$axios.$get('http://localhost:3666/api/user/tableData')
      this.headers = tableData.headers
      this.items = tableData.items
    }


  }
</script>
