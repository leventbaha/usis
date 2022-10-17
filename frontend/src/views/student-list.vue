<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'StudentList',
  data() {
    return {
      students: [],
      time: new Date(),
    }
  },
  async created() {
    this.students = await this.fetchStudents()
  },
  methods: {
    ...mapActions(['fetchStudents']),
  },
}
</script>

<template lang="pug">
.HOMEPAGE
p Your central date is {{ time }}
h2 Students
  div(v-for="student in students")
    router-link(:to="`/student/${student.name}`") {{ student.name }}
</template>
