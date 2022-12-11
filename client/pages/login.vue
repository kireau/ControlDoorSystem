<template>
  <v-form v-model="valid">
    <v-container fluid>
      <form>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="login"
              :rules="nameRules"
              :counter="30"
              label="Логин"
              required
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :rules="nameRules"
            :counter="30"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Пароль"
            required
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn>
            Войти
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      </form>

    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
      show1: false,
      valid: false,
      login: '',
      password: '',
      nameRules: [
        v => !!v || 'Поле пустое',
        v => v.length <= 30 || 'Не более 30-ти символов',
      ],
    }),
}
</script>
