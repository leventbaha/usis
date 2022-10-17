<script>
export default {
  name: 'StudentCard',
  props: ['student'],
}
</script>

<template lang="pug">
.box
  h1 {{ student.name }} ({{ student.studentID }})
  p {{ student.department }} ==> year: {{ student.year }}
  h2 Courses:

  //- .course(v-for="course in student.courses")
  //-  h3 {{ course }}
  //-  p(v-if="!course.takenBy.length")
  //-  no course taken yet!
  //-  p(v-else)
  //- | {{ course.takenBy.map(student => student.name).join(', ') }}
</template>

<style scoped>
.box {
  padding: 2rem;
  border: 3px solid rgb(0, 0, 0);
  background: rgba(238, 234, 8, 0.452);
  border-radius: 0.3rem;
}
</style>
