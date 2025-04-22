document.addEventListener("DOMContentLoaded", () => { 
  // Putting everything inside here, so that, these things get worked upon after we've once loaded the page successfully.  
  let task_text = document.getElementById("todo-input");

  let add_task_btn = document.getElementById("add-task-btn");

  let ul_parent = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



//   Rendering the tasks to the DOM:-

function renderTask(task) {
    const lii = document.createElement('li')
    lii.setAttribute('data-id', task.id)
    if(task.completed){
        lii.classList.add("completed")
    }

    lii.innerHTML = `
    <bold>${task.text}</bold>
    <button>Delete</button>`
    
    lii.addEventListener('click', function(e){
        if(e.target.tagName === 'BUTTON') return
        e.preventDefault()
        task.completed = !task.completed
        lii.classList.toggle('completed')
        saveTasksToLocalStorage()
    })
    
    lii.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation()  // For preventing the toggle from firing.
        tasks = tasks.filter(t => t.id != task.id) 
        // Just an arrow based function for the array.filter method.
        // Here, we're filtering and asking for those whose id doesn't match mine.
        saveTasksToLocalStorage()
    })

    ul_parent.appendChild(lii)
  }

  
 tasks.forEach(task => {
     renderTask(task)
});
    

  add_task_btn.addEventListener("click", function (e) {
    const taskText = task_text.value.trim();

    if (taskText === "") return;

    
    
    for(let task of tasks)
    {
        if(task.text.toLowerCase === taskText.toLowerCase)
        {
            alert('task already exists!')
            window.location.reload()
            return
        }
    }

    // Create this new object only if the task doesn't already exists
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
    
      
    tasks.push(newTask);
    saveTasksToLocalStorage();
    task_text.value = "";
    window.location.reload()
  });



  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.reload()
  }

});
