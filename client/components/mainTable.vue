<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      loading="true"
    ></v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'MainTable',
    data() {
      return {
        headers: [
          {
            text: 'Сотрудник',
            align: 'start',
            sortable: false,
            value: 'name',
          },
        ],
        items: [],
      }
    },

    // metods: {
    //   async createRow(usersName, doorsName) {
    //     let completRow = []
    //     for (const el1 of usersName) {
    //       let elRow = {
    //         name: el1.name
    //       }
    //       for (const el2 of doorsName) {
    //         elRow[el2.value] = 'false'
    //       }
    //       completRow.push(elRow)
    //     }
    //     return completRow
    //   }
    // },

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
            name: el1.name
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
