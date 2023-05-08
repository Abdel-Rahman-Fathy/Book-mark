let btnform = document.getElementById('btnform');
let btnUpdate = document.getElementById('btnUpdate');
let webName=document.getElementById("webName");
let webURL=document.getElementById("webURL");
let tbody=document.getElementById("tbody");
let bookMarks;
var currantindex=0 ;




if (localStorage.getItem("bookmark")!=null) {
    bookMarks=JSON.parse(localStorage.getItem("bookmark"))
    display();
   }
   else{
    bookMarks=[];

   }




btnform.addEventListener("click" ,  ()=> {
   add();
   clear();
})



function add(){
    if(webNameValid()==true){
        let websites={
            name:webName.value,
            url:webURL.value
        }
        bookMarks.push(websites);
        localStorage.setItem("bookmark",JSON.stringify(bookMarks))
        display()
    }
    else{
        alert("The input is vaild")
    }

}

function deleted(index){
    bookMarks.splice(index,1);
    localStorage.setItem("bookmark",JSON.stringify(bookMarks))
    display();

}

function clear(){
    webName.value=``;
    webURL.value=``;
}

function update(index) {
    currantindex=index;
    webName.value=bookMarks[index].name;
    webURL.value=bookMarks[index].url;
    btnform.classList.replace("d-block","d-none")
    btnUpdate.classList.replace("d-none","d-block")
}
btnUpdate.addEventListener("click",function(){
    btnform.classList.replace("d-none","d-block")
    btnUpdate.classList.replace("d-block","d-none")
    let websites={
        name:webName.value,
        url:webURL.value
    }
    bookMarks[currantindex]=websites;
    localStorage.setItem("bookmark",JSON.stringify(bookMarks))
    clear();
    display()
})

function display(){
    let cartona=``;
    for(let i = 0 ; i<bookMarks.length ; i++){
        cartona+=`
        <tr>
            <td>${i+1} :  ${bookMarks[i].name}</td>
            <td class="text-center">
                <button class="btn btn-primary " onclick="deleted(${i})" >Delete</button>
                <button class="btn btn-secondary" onclick="update(${i})">Edite</button>
                <a class="btn btn-success" href=${bookMarks[i].url} target='_blank'>Visit</a>
            </td>
        </tr>
        `
    }
    tbody.innerHTML=cartona;

}


function webNameValid() {
    
    let regx = /^[A-Z]{1}[a-z]{1,}$/
    if(regx.test(webName.value)==true){
        webName.classList.replace("is-invalid","is-valid")
        return true;
    }
    else{
        webName.classList.add("is-valid","is-invalid")
        return false;
    }

}



