<template>
  
<div>
    <h1>{{name}}</h1>
    <h2>Projects</h2>
    <div v-if="pending1">Loading...</div>
    <ul>
      <li v-for="project in projects" :key="project.name">
        
        <h2>{{project.name}}</h2>
        <p>{{project.description}}</p>
      </li>
    </ul>
  </div>

  <div>
    <h2>Blogs</h2>
    <div v-if="pending2">Loading...</div>
    <ul>
      <li v-for="blog in blogs" :key="blog.title">
        <h2>{{blog.title}}</h2>
        <p>{{blog.content}}</p>
      </li>
    </ul>
  </div>

</template>

<script setup>

  const name = "Nuraj Perera" ;
const {data: projects, pending1, error1} = useFetch('http://localhost:8080/projects');
const {data: blogs, pending2, error2 } = useFetch('http://localhost:8080/blogs');

</script>



