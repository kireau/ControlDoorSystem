<template>
  <v-form>
    <v-card
      elevation="11"
      outlined
    >
    <!-- Блок личных данных -->
      <v-row class="mt-3 justify-center">
        <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="name"
              label="ФИО сотрудника"
              :rules="formRules"
              filled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-select
              v-model="role"
              :items="roleItems"
              :rules="formRules"
              filled
              label="Права доступа"
          ></v-select>
          </v-col>
      </v-row>
      <v-row class="justify-center">
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="login"
              label="Логин"
              :rules="formRules"
              filled
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="password"
              label="Пароль"
              filled
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
                      mt-3">
          <v-col
            cols="12"
            sm="6"
            md="3">
            <v-text-field
              v-model="chip"
              label= 'Ключ чипа'
              filled
              :rules="formRules"
            ></v-text-field>
            <v-select
                v-model="doors"
                :items="doorsItems"
                filled
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
      <v-card class="d-flex justify-space-around mt-3"
              flat
              tile>
        <v-card outlined
              class="text-center"
              width="150"
              v-for="item in doorsAccessSelect"
              :key="item.id"
        >
          <v-checkbox
            v-model="doorAccess"
            :label= item.text
            :value= item.id
          ></v-checkbox>
        </v-card>
      </v-card>
      <!-- Блок кнопок -->
      <v-row class="justify-center mt-3">
        <v-btn
          class="ml-5 green"
          elevation="4"
          :disabled="!checkForm ? true : false"
          @click="createUser"
        >
          Регистрация
        </v-btn>
        <v-btn
          class="ml-5 red"
          elevation="4"
          @click="getKey"
        >
          Отмена
        </v-btn>
      </v-row>
      <!-- тестирование -->
      <v-row class="justify-center mt-5">
        <v-col
          cols="12"
          sm="6"
          md="3">
          <v-text-field
            v-model="doorAccess"
            label= 'do'
            filled

          ></v-text-field>
        </v-col>
      </v-row>
      <!-- тестирование -->
    </v-card>
  </v-form>
</template>

<script>
  export default {
    name: 'CreateForm',

    data() {
      return {
        testField: '',
        formRules:[
          v => !!v || 'Заполните поле'
        ],
        show1: false,
        password: '',
        login: '',
        name: '',
        role: '',
        roleItems: ['Admin',
                    'User',],
        doors: '',
        doorsItems: [],
        chip: '',
        doorsAccessSelect: [],
        doorAccess: [],
      }
    },

    methods: {
      // дорабатывается!!!!!!!!!
      // получить ключ из двери
      async getKey() {
        const key = await this.$axios.$post(`http://localhost:3666/api/hw/getKey/${this.doors}`)
        this.chip = key
      },

      // отправить данные на создание юзера
      async createUser() {
        await this.$axios.$post('http://localhost:3666/api/user/', {
          name: this.name,
          login: this.login,
          password: this.password,
          role: this.role,
          chip: this.chip,
          doors: this.doorAccess
        })
        alert('Пользователь успешно создан')
      }
    },

    computed: {
      // проверка заполнения формы
      checkForm() {
        // if(this.name && this.login && this.password && this.role && this.chip) {
        //   return this.checkFormFlag = true
        // }
        return Boolean(this.name && this.login && this.password && this.role && this.chip)



      }
    },

    async mounted () {
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
  }
</script>

