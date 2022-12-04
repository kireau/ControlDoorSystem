<template>
  <v-container>
    <v-data-table
      dense
      :headers="headers"
      :items="items"
      :items-per-page="5"
      show-expand
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      class="elevation-1"
      loading="true"
    >
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Система доступа к дверям</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogCreate"
            max-width="500px"
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                dark
                color="green"
                v-bind="attrs"
                v-on="on"
                >
                Добавить сотрудника
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Введите пароль администратора
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="inputPassword"
                      max-width="300px"
                      :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showIcon ? 'text' : 'password'"
                      @click:append="showIcon = !showIcon"
                      @keyup.native.enter="checkAdminCreate"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="checkAdminCreate"
                    >
                      Проверить
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-dialog
            v-model="dialogEdit"
            max-width="500px"
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                dark
                color="green"
                v-bind="attrs"
                v-on="on"
                >
                Изменить сотрудника
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Введите пароль администратора
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="inputPassword"
                      max-width="300px"
                      :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showIcon ? 'text' : 'password'"
                      @click:append="showIcon = !showIcon"
                      @keyup.native.enter="checkAdminEdit(item)"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="checkAdminEdit(item)"
                    >
                      Проверить
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </td>
      </template>

    <!-- иконка действий -->
      <template v-slot:item.actions="{ item }"
      >
        <v-icon
          small
          @click="deleteRow(item)">
          mdi-delete
        </v-icon>

      </template>

    <!-- Наглядные тру-фэлс ДОРАБОТАТЬ!!!!-->
      <template v-slot:item.access1="{ item }"
      >
        <v-chip
          :color="getColor(item.access1)"
        >

        </v-chip>
      </template>

    </v-data-table>

    <template>
        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="2000"
        >
          {{ snackText }}
        </v-snackbar>
      </template>
<!-- диалог редактирования -->
      <template>
          <v-row justify="center">
            <v-dialog
              v-model="dialogEditForm"
              max-width="1050px"
              >
              <v-card>
                <edit-item
                :userRow="editedItem"
                v-if="dialogEditForm"
                @closeForm="closeEditForm"
                ></edit-item>
              </v-card>
            </v-dialog>
          </v-row>
      </template>
<!-- Диалог удаления -->
      <template>

          <v-row justify="center">
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
          </v-row>

      </template>


  </v-container>
</template>

<script>
  import EditItem from './EditItem.vue'

  export default {
    name: 'MainTable',

    components: {
      EditItem,
    },

    data() {
      return {
        headers: [],
        items: [],

        dialogDelete: false,
        dialogCreate: false,
        dialogEdit: false,
        dialogEditForm: false,
        snackbar: false,
        snackText: '',
        snackbarColor: 'red',

        inputPassword: '',
        showIcon: false,

        editedItem: {},
        editedUser: {
          name: '',
          id: '',
          index: '',
        },

        expanded: [],

      }
    },

    watch: {
      dialogDelete(val) {
        val || this.closeDelete()
      },
      dialogCreate(val) {
        val || this.closeCreate()
      },
      dialogEdit(val) {
        val || this.closeCreate()
      },

    },

    methods: {
      // получить цвет
      getColor (access) {
        if (access === "true") return 'green'
        else return 'red'
      },
      // Диалог создания
      async checkAdminCreate() {
        try {
          const checkPass = await this.$axios.$get(`http://localhost:3666/api/user/check/${this.inputPassword}`)
          console.log(`Проверка пароля: ${checkPass}`)
            if (!checkPass) {
              this.snackbarColor = 'red'
              this.snackText = 'Неверный парорль'
              this.snackbar = true
            }
            else {
              this.snackbarColor = 'light-green'
              this.snackText = 'Пароль принят'
              this.snackbar = true
              setTimeout(() => {
                this.$nuxt.$options.router.push({path: '/reg'})
              }, 1000)

              this.closeCreate()
            }

        } catch (error) {
          console.log('Ошибка проверки пароля')
          alert('Ошибка проверки пароля')
          this.closeCreate()
        }

      },

      closeCreate() {
        this.dialogCreate = false
      },

      // Диалог редактирования
      async checkAdminEdit(userRow) {
        try {
          const checkPass = await this.$axios.$get(`http://localhost:3666/api/user/check/${this.inputPassword}`)
          console.log(`Проверка пароля: ${checkPass}`)
            if (!checkPass) {
              this.snackbarColor = 'red'
              this.snackText = 'Неверный парорль'
              this.snackbar = true
            }
            else {
              this.snackbarColor = 'light-green'
              this.snackText = 'Пароль принят'
              this.snackbar = true
              this.closeEdit()
              // this.editedItem = userRow
              this.editedItem = await this.$axios.$get(`http://localhost:3666/api/user/edit/${userRow.userID}`)
              this.inputPassword = ''
              this.openEditForm()
            }

        } catch (error) {
          console.log('Ошибка проверки пароля')
          alert('Ошибка проверки пароля')
          this.closeEdit()
        }
      },

      closeEdit() {
        this.dialogEdit = false
      },

      closeEditForm() {
        this.editedItem = {}
        this.dialogEditForm = false
        this.initialize()
      },

      openEditForm() {

        this.dialogEditForm = true
        // EditItem.mount()
        //console.log(this.editedItem)
        // setTimeout(() => {
        //         this.$nuxt.$options.router.push({path: `/edit/${this.editedItem.userID}`})
        //       }, 200)
      },


      // диалог удаления
      deleteRow(userID) {
        this.dialogDelete = true
        this.editedUser.index = this.items.indexOf(userID)
        this.editedUser.name = userID.name
        this.editedUser.id = userID.userID
        // console.log(userID.userID)
      },

      // отмена удаления
      closeDelete() {
        this.dialogDelete = false
        this.editedUser.name = ''
        this.editedUser.id = ''
      },

      // подтверждение удаления
      async confirmDelete() {
        try {
          await this.$axios.$delete(`http://localhost:3666/api/user/${this.editedUser.id}`)
          this.items.splice(this.editedUser.index, 1)
          this.closeDelete()
        } catch (error) {
          alert('Что-то пошло не так...')
          this.closeDelete()
        }

      },
      // Инициализация
      async initialize () {
        const tableData = await this.$axios.$get('http://localhost:3666/api/user/tableData')
        this.headers = tableData.headers
        this.items = tableData.items
      }
    },
    async mounted () {

      // получение данных таблицы
      this.initialize()
    }


  }
</script>
