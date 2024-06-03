<template>
  
<h1>{{name}}</h1>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Projects</h2>
        <div v-if="pending1">Loading...</div>
        <ul>
          <li v-for="project in projects" :key="project.name">
            <h2>{{project.name}}</h2>
            <p>{{project.description}}</p>
          </li>
        </ul>
      </div>

      <div class="col">
        <h2>Blogs</h2>
        <div v-if="pending2">Loading...</div>
        <ul>
          <li v-for="blog in blogs" :key="blog.title">
            <h2>{{blog.title}}</h2>
            <p>{{blog.content}}</p>
          </li>
        </ul>
      </div>

    </div>
  </div>
  

     <!--form to create projects-->

  <div class="container">
    <div class="row">
      <div class="col">
       
      
        <h2>Create Project</h2>
        <form @submit.prevent="createProject">
          <div class="mb-3">
            <label for="projectName" class="form-label">Project Name</label>
            <input type="text" class="form-control" id="projectName" v-model="newProject.name">
          </div>
          
          <div class="mb-3">
            <label for="projectDescription" class="form-label">Project Description</label>
            <textarea class="form-control" id="projectDescription" v-model="newProject.description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Create Project</button>
        </form>
      </div>
    </div>
  </div>
  <br>


  <!--form to update projects by id-->
 <!--form to create projects-->

  <div class="container">
    <div class="row">
      <div class="col">
       
      
        <h2>Update Project</h2>
          <form @submit.prevent="updateProject">
                     <select class="form-select mb-3" id="updateProjectId" v-model="newupdateProject._id">
              <option value="" selected disabled>Select the project name</option>
              <option v-for="project in projects" :value="project._id">{{ project.name }}</option>
            </select>
          <div class="mb-3">
            <label for="updateProjectName" class="form-label">New Project Name</label>
            <input type="text" class="form-control" id="updateProjectName" v-model="newupdateProject.name">
          </div>
          <div class="mb-3">
            <label for="updateProjectDescription" class="form-label">New Project Description</label>
            <textarea class="form-control" id="updateProjectDescription" v-model="newupdateProject.description"></textarea>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">Update Project</button>
          </div>
        
        </form>
      </div>
    </div>
  </div>
  <br>

  

  <!--form to delete projects using the id-->
 

  <div class="container">
    <div class="row">
      <div class="col">
      
        <h2>Delete Project</h2>
        <form @submit.prevent="deleteProject">
          <div class="mb-3">
            <label for="deleteProjectId" class="form-label">Project ID</label>
            <select class="form-select" id="deleteProjectId" v-model="deleteProjectId">
              <option value="" selected disabled>Select the project name</option>
              <option v-for="project in projects" :value="project._id">{{ project.name }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Delete Project</button>
        </form>
      </div>
    </div>
  </div>

<br>


  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Update Project</h2>
        <form @submit.prevent="updateProject">
          <div class="mb-3">
            <label for="newProjectName" class="form-label">Project Name</label>
            <input type="text" class="form-control" id="newProjectName" v-model="newProject.name">
          </div>
          <div class="mb-3">
            <label for="newProjectDescription" class="form-label">Project Description</label>
            <textarea class="form-control" id="newProjectDescription" v-model="newProject.description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Update Project</button>
        </form>
      </div>
    </div>
  </div>




  </template>

<script setup>

useHead({
  title: 'My Portfolio',
  link: [
    { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
      crossorigin: 'anonymous'
    }
  ]
});

const name = "Nuraj Perera";
const { data: projects, pending1, error1 } = useFetch('http://localhost:8080/projects');
const { data: blogs, pending2, error2 } = useFetch('http://localhost:8080/blogs');

// Variable to get data on projects from form
const newProject = ref({
  name: '',
  description: ''
});

// Function to create projects 
const createProject = async () => {
  console.log(newProject.value);

  try {
    const response = await fetch('http://localhost:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject.value)
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const result = await response.json();

    // Adding new project to the list of projects without refreshing the page
    projects.value.push(result);

    // Resetting the form
    newProject.value.name = '';
    newProject.value.description = '';
  } catch (error) {
    console.error("Error", error);
  }
};

// Variable to get updated project data from form
const newupdateProject = ref({
  _id: '',
  name: '',
  description: ''
});

// Function to update projects
const updateProject = async () => {
  console.log(newupdateProject.value);

  try {
    const response = await fetch(`http://localhost:8080/projects/${newupdateProject.value._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newupdateProject.value.name,
        description: newupdateProject.value.description
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    // Update the project without refreshing the page
    const updatedProject = await response.json();

    const index = projects.value.findIndex(project => project._id === updatedProject._id);
    if (index !== -1) {
      projects.value.splice(index, 1, updatedProject);
    }

    // Resetting the form
    newupdateProject.value._id = '';
    newupdateProject.value.name = '';
    newupdateProject.value.description = '';
  } catch (error) {
    console.error("Error", error);
  }
};

// Variable to get project id to delete
const deleteProjectId = ref('');

// Function to delete projects
const deleteProject = async () => {
  console.log(deleteProjectId.value);
  try {
    const response = await fetch(`http://localhost:8080/projects/${deleteProjectId.value}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    // Removing the project from the list of projects
    projects.value = projects.value.filter(project => project._id !== deleteProjectId.value);

    // Resetting the form
    deleteProjectId.value = '';
  } catch (error) {
    console.error("Error", error);
  }
};


    
      
</script>


<style>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .col {
    flex: 1;
    padding: 10px;
  }

  .dropdown {
    margin-top: 20px;
  }

  .dropdown-toggle {
    width: 100%;
  }
</style>
