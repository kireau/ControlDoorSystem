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
        <v-toolbar>
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
        </v-toolbar>
      </template>


  </v-container>
</template>

<script>
  export default {
    name: 'MainTable',
    data() {
      return {
        headers: [
          {
            text: 'Дейтсвия',
            value: 'actions',
            sortable: false,
          },
          {
            text: 'Сотрудник',
            align: 'start',
            value: 'name',
          },
        ],
        items: [],

        dialogDelete: false,
        editedUser: {
          name: '',
          id: '',
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
        await this.$axios.$delete(`http://localhost:3666/api/user/${this.editedUser.id}`)
        this.closeDelete()
      }
    },

    async mounted () {
      // Получаем список дверей и добавляес его к хэдэру таблицы
      const doorList = await this.$axios.$get('http://localhost:3666/api/door')
      console.log(doorList)
      this.headers = this.headers.concat(doorList)
      // формируем тело таблицы
      const nameColumn = await this.$axios.$get('http://localhost:3666/api/user')
      console.log(nameColumn)

      let completRow = []
        for (const el1 of nameColumn) {
          let elRow = {
            name: el1.name,
            userID: el1.id,
          }
          for (const el2 of doorList) {
            elRow[el2.value] = await this.$axios.$post(`http://localhost:3666/api/user/check/${el1.name}/${el2.text}`)
            // elRow[el2.value] = 'false'
          }
          completRow.push(elRow)
        }
      console.log(completRow)

      this.items = completRow
    },

  }
</script>
