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

  //create a new project
  <div>
    <h2>Create a new project</h2>
    <form @submit.prevent="createProject">
      
      <label for="name">Name</label>
      <input type="text" v-model="newProject.name" placeholder="Name" />
      
      <label for="description">Description</label>
      <input type="text" v-model="newProject.description" placeholder="Description" />
      <button type="submit">Create Project</button>
    </form>
  </div>

  //create a patch request
  <div>
    <h2>Update a project</h2>
    <form @submit.prevent="updateProject">
      
      <label for="name">Name</label>
      <input type="text" v-model="updateProject.name" placeholder="Name" />
      
      <label for="description">Description</label>
      <input type="text" v-model="updateProject.description" placeholder="Description" />
      <button type="submit">Update Project</button>
    </form>
  </div>

  //create a delete request
  <div>
    <h2>Delete a project</h2>
    <form @submit.prevent="deleteProject">
      
      <label for="name">Name</label>
      <input type="text" v-model="deleteProject.name" placeholder="Name" />
      
      <button type="submit">Delete Project</button>
    </form>
  </div>

</template>

<script setup>

  const name = "Nuraj Perera" ;
const {data: projects, pending1, error1} = useFetch('http://localhost:8080/projects');
const {data: blogs, pending2, error2 } = useFetch('http://localhost:8080/blogs');

</script>



