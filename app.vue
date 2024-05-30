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
            <label for="newProjectName" class="form-label
            ">Project Name</label>
            <input type="text" class="form-control" id="newProjectName" v-model="newProject.name">
          </div>
          <div class="mb-3">
            <label for="newProjectDescription" class="form-label">Project Description</label>
            <textarea class="form-control" id="newProjectDescription" v-model="newProject.description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Create Project</button>
        </form>
      </div>
    </div>
  </div>
  <br>


  <!--form to update projects by id-->
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Update Project</h2>
        <form>
          <div class="mb-3">
            <label for="updateProjectId" class="form-label">Project Id</label>
            <input type="text" class="form-control" id="updateProjectId">
          </div>
          <div class="mb-3">
            <label for="updateProjectName" class="form-label
            ">Project Name</label>
            <input type="text" class="form-control" id="updateProjectName">
          </div>
          <div class="mb-3">
            <label for="updateProjectDescription" class="form-label
            ">Project Description</label>
            <textarea class="form-control" id="updateProjectDescription"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Update Project</button>
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
        <form>
          <div class="mb-3">
            <label for="deleteProjectId" class="form-label">Project Id</label>
            <input type="text" class="form-control" id="deleteProjectId">
          </div>
          <button type="submit" class="btn btn-primary">Delete Project</button>
        </form>
      </div>
    </div>
  </div>




  </template>

<script setup>

useHead({
  link: [
    { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
      crossorigin: 'anonymous'
    }
  ]
})

  const name = "Nuraj Perera" ;
const {data: projects, pending1, error1} = useFetch('http://localhost:8080/projects');
const {data: blogs, pending2, error2 } = useFetch('http://localhost:8080/blogs');

//catching data from the project
const newProject = ref({
  name: '',
  description: ''
});



//function to create a new project
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

    if(!response.ok){
      throw new Error('Failed to create project');
    }

    const result = await response.json();

    //function to update a project by id
    const updateProject = async () => {
      console.log(newProject.value);

      try {
        const response = await fetch('http://localhost:8080/projects', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProject.value)
        });

        if(!response.ok){
          throw new Error('Failed to update project');
        }

        const result = await response.json();

        //function to delete a project by id
        const deleteProject = async () => {
          console.log(newProject.value);

          try {
            const response = await fetch('http://localhost:8080/projects', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newProject.value)
            });

            if(!response.ok){
              throw new Error('Failed to delete project');
            }

            const result = await response.json();

          } catch (error) {
            console.error("Error",error);
          }
        }
      } catch (error) {
        console.error("Error",error);
      }
    }

   


    //adding new project to the list of projects
    projects.value.push(result);

    

    //resetting the form
    newProject.value.name = '';
    newProject.value.description = '';

  } catch (error) {
    console.error("Error",error);
  }
}
</script>



