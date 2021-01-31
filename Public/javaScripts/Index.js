/**
 * TODO : add your  JavaScript logic for user interfaces
 */
$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});

 
function aadhaarno(){              
        var regexp=/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
        
        var x=document.getElementById("aadhaar").value;
        if(regexp.test(x))
            {
              return true;
                
            }
        else{ return false;
          }
}

/* Seller main page lists items tasks logic begins */

document.getElementById('new-product').addEventListener('submit', addNew);
 
// Save new To-Do
function addNew(e) {
 
  let title = document.getElementById('title').value;
  let price = document.getElementById('price').value;
  let description = document.getElementById('description').value;
 
 
  let task = {
    title,
    price,
    description
  };
 
  if (localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
 
  getTasks();
 
  // Reset form-Task
  document.getElementById('form-Task').reset();
  e.preventDefault();
 
}
 
// Delete To-Do 
function deleteTask(title) {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
 
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}
 
// Show To-Do List
function getTasks() {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
 
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let price = tasks[i].price;
    let description = tasks[i].description;
 
    tasksView.innerHTML +=
      `<div class="card mb-3">
        <div class="card-body">
        <div class="row">
          <div class="col-sm-3 text-left">
            <p>${title}</p>
          </div>
          <div class="col-sm-3 text-left">
            <p>${price}</p>
          </div>
          <div class="col-sm-4 text-left">
            <p>${description}</p>
          </div>
          <div class="col-sm-2 text-right">
            <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">X</a>
          </div>
        </div>  
       </div>
      </div>`;
  }
 
}
 
getTasks();

/* Seller main page lists items logic end */
