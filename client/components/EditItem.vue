<template>
  <v-card
    elevation="11"
    outlined
  >
    <v-card-title class="text-h5">Редактировать пользователя "{{ userRow.name }}" ?</v-card-title>
    <v-card-text>
      <!-- Блок личных данных -->
      <v-row class="mt-3 justify-center" dense>
        <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="user.name"
              label="ФИО сотрудника"
              :rules="formRules"
              filled
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-select
              v-model="user.role"
              :items="roleItems"
              :rules="formRules"
              filled
              dense
              label="Права доступа"
          ></v-select>
          </v-col>
      </v-row>
      <v-row class="justify-center" dense>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="user.login"
              label="Логин"
              :rules="formRules"
              filled
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="user.password"
              label="Пароль"
              filled
              dense
              :rules="formRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
      </v-row>
      <!-- Блок получения ключа -->
      <v-card
        cols="6"
        outlined
        >
        <v-row class="justify-center
                      mt-3"
                      dense>
          <v-col
            cols="12"
            sm="6"
            md="3">
            <v-text-field
              v-model="user.chip"
              label= 'Ключ чипа'
              filled
              dense
              :rules="formRules"
            ></v-text-field>
            <v-select
                v-model="doors"
                :items="doorsItems"
                filled
                dense
                label="Выбери дверь"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3">
            <v-btn
              elevation="4"
              :disabled="!doors ? true : false"
              @click="getKey"
              >
              Запросить
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <!-- Блок доступных дверей -->
      <v-card class="d-flex justify-space-around mt-3 mb-5"
              flat
              tile>
        <v-card outlined
              class="text-center"
              width="150"
              v-for="item in doorsAccessSelect"
              :key="item.id"
        >
          <v-checkbox
            v-model="user.doorAccess"
            :label= item.text
            :value= item.id
          ></v-checkbox>
        </v-card>
      </v-card>
      <!-- Блок кнопок -->
      <v-card-actions class="justify-center mt-3 pb-5">
        <v-btn
          class="green"
          elevation="1"
          @click="editUser"
        >
          Подтвердить
        </v-btn>
        <v-btn
          class="ml-5 red"
          elevation="1"
          @click="closeForm"
        >
          Отмена
        </v-btn>
      </v-card-actions>
      <!-- тестирование -->
      <!-- <v-row class="justify-center mt-5">
        <v-col
          cols="12"
          sm="6"
          md="3">
          <v-text-field
            v-model="testField"
            label= 'do'
            filled

          ></v-text-field>
        </v-col>
      </v-row> -->
      <!-- тестирование -->

      <!-- {{ this.userRow }} -->
    </v-card-text>

  </v-card>
</template>

<script>

  export default {
    name: 'EditItem',

    props: {
      userRow: Object,
    },

    components: {

    },

    data() {
      return {
        testField: '',
        formRules:[
          v => !!v || 'Заполните поле'
        ],
        show1: false,

        user: {
          name: this.userRow.name,
          login: this.userRow.login,
          password: this.userRow.password,
          role: this.userRow.role,
          chip: this.userRow.chip,
          doorAccess: this.userRow.doors,
        },

        doors: '',
        roleItems: ['Admin',
                    'User',],
        doorsItems: [],
        doorsAccessSelect: [],
      }
    },

    methods: {
      // получить ключ из двери
      async getKey() {
        const key = await this.$axios.$post(`http://localhost:3666/api/hw/getKey/${this.doors}`)
        this.user.chip = key
      },

      closeForm() {

        this.$emit('closeForm')
      },

      async editUser() {
        try {
          const newUser = await this.$axios.$put('http://localhost:3666/api/user', {
            id: this.userRow.id,
            name: this.user.name,
            login: this.user.login,
            password: this.user.password,
            role: this.user.role,
            chip: this.user.chip,
            doors: this.user.doorAccess,
          })
          console.log(newUser)
          alert(`Пользователь ${newUser.name} успешно изменен`)
          this.closeForm()
        } catch (error) {
          console.log('Ошибка изменения юзера')
          console.log(error.response)
          alert(`Ошибка!!! ${error.response.data}`)
        }

      },
    },

    computed: {

    },

    async mounted () {
      console.log('МоНтИрОвААН')
      // Получаем список дверей
      const gettingDoorList = await this.$axios.$get('http://localhost:3666/api/door')
      //console.log(gettingDoorList)
      let doorList = []
      for (const el of gettingDoorList) {
        //console.log(el.text)
        doorList.push(el.text)
      }
      this.doorsItems = doorList
      ///////////////////////////////////////
      // Формаруем массив данных для карточек дверей (чекбоксы)
      this.doorsAccessSelect = gettingDoorList
      ///////////////////////////////////////
    },

    beforeUnmount() {
      console.log('Размонтируется ')
      },

    unmounted() {
      console.log('Размонтирован')
    },
  }
</script>

