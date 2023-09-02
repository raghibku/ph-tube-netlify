const videoContainer = document.getElementById("videoContainer");
const categoryContainer = document.getElementById("categories");
const blankVid = document.getElementById("blankVid");
let isSortByViews = false;
let catID=1000;
let butArr=[1000,1000];

const loadCategories = async() => {
    
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const categories = data.data;
    createCategories(categories) ;
    console.log(categories);
}
loadCategories();

const createCategories = (categories) => {
    for(item of categories){
        createButton(item);
        console.log(item.category)
    }
}
const createButton = (item) => {
    let button = document.createElement('button');
    button.id = item.category_id;
    button.innerText = `${item.category}`;
    button.classList.add("px-4", "py-2","mx-1","my-2","md:mx-4", "bg-gray-300","rounded-md","text-black");
    categoryContainer.appendChild(button);
    button.addEventListener("click",(()=>{
        filterVideos(item.category_id);
        catID=item.category_id;
        // button.classList.replace("bg-gray-300","bg-red-300");
    }))
}
const filterVideos = (catID) => {
    videoContainer.innerHTML='';
    loadVideo(catID,isSortByViews);
    if(blankVid.classList.contains("block")){
        blankVid.classList.replace("block","hidden"); 
    }
}
