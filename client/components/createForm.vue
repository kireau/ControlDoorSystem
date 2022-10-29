<template>
  <v-form>
    <v-card
      elevation="11"
      outlined
    >
      <v-row class="mt-5 justify-center">
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
      <v-card
        cols="6"
        outlined
        >
        <v-row class="justify-center
                      mt-5">
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
      <!-- тестирование -->
      <v-row class="justify-center">
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
      }
    },

    methods: {
      // дорабатывается!!!!!!!!!
      async getKey() {
        const key = await this.$axios.$post(`http://localhost:3666/api/hw/getKey/${this.doors}`)
        this.testField = key
      },
    },

    async mounted () {
      // Получаем список дверей
      const gettingDoorList = await this.$axios.$get('http://localhost:3666/api/door')
      console.log(gettingDoorList)
      let doorList = []
      for (const el of gettingDoorList) {
        console.log(el.text)
        doorList.push(el.text)
      }
      this.doorsItems = doorList
      ///////////////////////////////////////

    },
  }
</script>

