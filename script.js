let list1 = document.querySelector("#list");
const clear=document.querySelector("#clear");
const dat=document.querySelector("#date");
const input=document.querySelector("#input");
var check = "../photo/icons8-circle-96.png";

var uncheck = "../photo/unchecked.png";
var linethrough = "lineThrough";
 
const chk="chk";
    var id=1;
 var task=[
     {
name:"complete",
id:0,
completed:false,
del:false
     }
 ]
 let data=localStorage.getItem("TODO");
 if(data){
     task=JSON.parse(data);
     id=task.length;
     loadtask(task);
 }
 else{
     task=[];
     id=0;
 }

 function loadtask(task){
     task.forEach(function(item){
         addToDo(item.name,item.id,item.completed,item.del);
     });

 }


 clear.addEventListener("click",function(){
     localStorage.clear();
    location.reload();
 });

 const today=new Date();
 dat.innerHTML=today.toDateString();
 document.addEventListener("keyup",function(event){
if(event.keyCode==13){
    const todo=input.value;
    if(todo){
        addToDo(todo,id,false,false);
        task.push({
            name:todo,
            id:id,
            completed:false,
            del:false
        });
        input.value="";
        id++;
    }
}
 })
 function addToDo( todo,id,completed,del ){
     if(del)
     return;
     const done=completed?check:uncheck;
     const line=completed?linethrough:"";
     const te = `<div class="item" style="text-decoration:${line}">
        <img  job="status" src=${done} id=${id} style="width: 61px; height:51px">
          
         <span class="text">${todo}</span>
         <img  job="del" id=${id} src="../photo/icons8-delete-128.png" style="width :81px ;height:71px; position:absolute;right: 15px;">
</div>`;
      list1.insertAdjacentHTML("beforeend",te);    
        
 }
 


 function completeToDo(element){
     console.log("in complete");
    if(task[element.id].completed){
element.setAttribute('src',"../photo/unchecked.png");
element.parentNode.classList.toggle(chk);
console.log("in if");



}
else{
element.setAttribute('src', "../photo/icons8-circle-96.png");
element.parentNode.classList.toggle(chk);
console.log("in else");
}
     task[element.id].completed=task[element.id].completed ? false : true;

 }
 
function removeToDo(element){
    console.log("in remove");

    element.parentNode.parentNode.removeChild(element.parentNode);

    task[element.id].del = true;

}

 list1.addEventListener("click",function(event){
     console.log(event);
     const element=event.target;
     const elementjob=element.attributes.job.value;
     console.log(element);
     console.log(elementjob);
     console.log();
     if (elementjob == "status") {
       completeToDo(element);
     } else if(elementjob=="del") {
       removeToDo(element);
     }
     localStorage.setItem("TODO",JSON.stringify(task));
 })
