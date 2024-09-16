<template>

  <div id="header">
    <div class="container">
      <nav>
        <img src="logo.png" alt="Logo" />
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>

   <div class="background">
    <!-- Your page content -->
    <h1>Nuraj Perera</h1>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

body {
  background-color: #080808;
  color: #fff;
}

.background {
  background-image: url('backgroundme.jpg'); /* Image from static folder */
  background-size: cover; /* Ensures the image covers the entire area */
  background-position: center;
  height: 90vh; /* Set the height of the element */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>
useHead({
  title: 'My Portfolio',
  link: [
    { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
      crossorigin: 'anonymous'
    }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
      integrity: 'sha384-MrcW6ZMFyC0EP6KH8U2n1ZKz2AKN8KK3EVH1a1kE/nMNpjx0I8pcja6N6a9f6Q5',
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
  try {
    const response = await fetch(`http://localhost:8080/projects/${deleteProjectId.value}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    projects.value = projects.value.filter(project => project._id !== deleteProjectId.value);

    // Resetting the form
    deleteProjectId.value = '';
  } catch (error) {
    console.error("Error", error);
  }
};
</script>
