<template>
  <v-form>
    <v-card
      elevation="11"
      outlined
    >
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

      <!-- тестирование -->
      <v-row class="justify-center mt-5">
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
    name: 'FormBase',

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
          name: '',
          login: '',
          password: '',
          role: '',
          chip: '',
          doorAccess: [],
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

    },

    computed: {
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

      this.user.name = this.userRow.name
      // СДЕЛАТЬ ЗАПРОС К СЕРВЕРУ НА ДАННЫЕ ДЛЯ ФОРМЫ
    },
  }
</script>
