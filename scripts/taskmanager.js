
function saveTask()
{
    console.log("saving task");
    //get the values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#status").val();
    const budget = $("#numBudget").val();
    console.log(title, description, color, date, status, budget);
    //build an object. to create an object, make a class similar to constructor.  An attribute describes the object. Method describes what an object can do. 
    let taskSave = new Task (title, description, color, date, status, budget);
    console.log(taskSave);

    //save to server using Async Javascript and XML (Ajax) 
    $.ajax({
        type: "post",
        url:"http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),  //JavaScript Object Notation (JSON)
        contentType:"application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
    
    //display the info into the page
    loadTasks();
    //displayTask(taskSave);
}
function displayTask(task)
{
    let syntax = `<div class='task' style="border-color:${task.color}">
<div class='info'>
<h5>${task.title}</h5>
<p>${task.description}</p>
</div>
<label>${task.date}</label>
<div class='date-budget'>
<label>${task.status}</label>
<label>${task.budget}</label>
</div>
</div>`;
$(".tasks").append(syntax);  
}

function testRequest()
{
    $.ajax({
        type: "get",//reading the server
        url:"http://fsdiapi.azurewebsites.net/",//the page we are trying to read
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }

    });
}

function loadTasks()
{
    $.ajax({
        type:"get",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            let data = JSON.parse(response); //"parse" converts JSON to JavaScript
            console.log(data);
            //create a for loop that filter only the messages that I create
            for (let i = 0;i<data.length;i++)
                {
                    let temporal = data[i];
                    if(temporal.name =="roy")
                        {
                            displayTask(temporal);
                        }
                }
        },
        error: function(error){
            console.log(error);
            
        }

    });
}
function init()
{
    $("#btnSave").click(saveTask);

}

window.onload = init; // () in front of init will execute when the page loads, don't use until HTML is rendered

//SRP Single Responsibility Principle 
//XML eXtensible Markup Language



