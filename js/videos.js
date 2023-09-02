

const loadVideo = async (catID=1000,isSortByViews=false) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catID}`);
    const data = await response.json();
    const videos = data.data;
    if(isSortByViews){
        const sortedVideos = sortVideos(videos);
        createVideo(sortedVideos);
    }
    else{
        createVideo(videos);
    }

    
}
loadVideo(catID,isSortByViews);

const sortVideos = (unsortedVideos) => {
    let sortedVideos = unsortedVideos.sort((objA,objB)=>
        numofViews(objB.others.views)-numofViews(objA.others.views)
    )
    return sortedVideos;
}
const numofViews=(srting)=>{
    let srtingNums=srting.slice(0,(srting.length-1));
    let stringUnit=srting.slice((srting.length-1),srting.length);
    let srtingFloat=parseFloat(srtingNums);
    let multiplier = 1;
    let adder = 0;
    let viewNum=1;
    if(isNaN(stringUnit)){
        console.log("notnumber")
        if(stringUnit.toLowerCase()=="k"){
            multiplier = 1000;
        }
        else if(stringUnit.toLowerCase()=="m"){
            multiplier = 1000000;
        }
        else if(stringUnit.toLowerCase()=="b"){
            multiplier = 1000000000;
        }
        viewNum=srtingFloat*multiplier
    }
    else{
        console.log("Number");
        adder = parseInt(stringUnit);
        viewNum=srtingFloat*10+adder;
    }
    return viewNum

}


const createVideo = (videos) => {
    if(videos.length==0){
        showBlank();
    }else{
        for (const video of videos) {
            // console.log(video.thumbnail);
            // console.log(video.title);
            // console.log(video.authors[0].profile_picture);
            // console.log(video.authors[0].profile_name);
            // console.log(video.authors[0].verified);
            // console.log(video.others.views);
            // console.log(typeof(video.others.views));
            // console.log(video.others.posted_date);
            // console.log(typeof(video.others.posted_date));
            displayVideo(video);
        }
    }
}

const displayVideo = (video) => {
    
    const videoCard = document.createElement('div');
    videoCard.classList.add("flex", "justify-center", "items-center","h-[320px]");
    videoCard.innerHTML = `
    <div class = "flex flex-col justify-start items-start">
        

        <div class="relative w-72 h-44">
            <img src=${video.thumbnail}  class="p-2 w-72 h-44 rounded-2xl absolute z-0"> 
            <div class="bg-black rounded-md absolute  z-10 bottom-4 right-6 ">
                <p class="text-white">${video.others.posted_date ?`&nbsp &nbsp ${ timeFormat(video.others.posted_date)} ago &nbsp &nbsp`:'' }<p>
            </div>
        </div>

        <div class="flex justify-center items-start">
            <div class="flex justify-start items-center pl-2 pt-2" >
                <img src=${video.authors[0].profile_picture} class="rounded-full w-12 h-12"  alt=""> 
            </div>
            <div class="flex flex-col justify-start items-start pl-2">
                <h1 class="text-xl">${video.title}</h1>
                <div class="flex justify-start items-center py-2">
                    <p>${video.authors[0].profile_name}</p>
                    <img src="./images/verified.png" width=${video.authors[0].verified?"20px":"0px"}>
                </div>
                <p class="pb-2">${video.others.views} views</p>
            </div>
        </div>
    </div>
    `
    videoContainer.appendChild(videoCard);

}

function showBlank(){
    blankVid.classList.replace("hidden","block"); 
}

function sortByView(){
    isSortByViews = true;
    videoContainer.innerHTML='';
    loadVideo(catID,isSortByViews);
    console.log(`this is cat ${catID}`)
}
function timeFormat(stringooo){
    let result='';

        const seconds = parseInt(stringooo);
        const hours = Math.floor(seconds/3600);
        const remainderSeconds = seconds%3600 ;
        const minutes = Math.floor(remainderSeconds/60);
        const finalSeconds = remainderSeconds%60;
        result = `${hours}hrs ${minutes}mins`; 
    return result;
}
function showBlog(){
    videoContainer.innerHTML='';
    blogPage.classList.replace("hidden","block");
    if(blankVid.classList.contains("block")){
        blankVid.classList.replace("block","hidden"); 
    }
}
function showBlog1(){
    window.location.href ="../blog/blog.html";
}