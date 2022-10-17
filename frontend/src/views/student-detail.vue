<script>
import axios from 'axios'
import StudentCard from '@/components/student-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'StudentDetail',
  components: { StudentCard },
  data() {
    return {
      student: null,
    }
  },
  async created() {
    this.student = await this.fetchStudent(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchStudent']),
  },
}
</script>

<template lang="pug">
.about
  h1 This is a student detail
  StudentCard(:student="student" v-if="student")
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
