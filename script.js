document.addEventListener("DOMContentLoaded", () => {  // Putting everything inside here, so that, these things get worked upon after we've once loaded the page successfully.  
  let task_text = document.getElementById("todo-input");

  let add_task_btn = document.getElementById("add-task-btn");

  let ul_parent = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



//   Rendering the tasks to the DOM:-
  tasks.forEach((task)=>{
    let task_tt = renderTask(task)
    let lii = document.createElement('li')
    lii.appendChild(document.createTextNode(task_tt))
    let btn = document.createElement('button')
    btn.appendChild(document.createTextNode('Delete'))
    lii.appendChild(btn)
    lii.setAttribute('data-id', task.id)

    lii.addEventListener('click', function(e){
        if(e.target.tagName === 'BUTTON') return
        task.completed = !task.completed
        lii.classList.toggle('completed')
        saveTasksToLocalStorage()
    })


    lii.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation()  // For preventing the toggle from firing.
        
    })
    ul_parent.appendChild(lii)
  })

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

  function renderTask(task) {
    // We want that, as sson as the application is run on the live server, the tasks array gets the values from the localStorage into itself, and, then, it displays those via the lis.
    return task.text
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // let us just try to put these on the console.
});
