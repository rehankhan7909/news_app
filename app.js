const key ="98c9254492cd49f5858886d92ef8149d";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fatchnews());
function reload(){
    window.location.reload();
}
async function fatchnews(query){
const res = await fetch(`${url}${query}&apikey=${key}`)
const data= await res.json();
console.log(data);
bindData(data.articles)
}
function bindData(articles){
    const cardscontainer =document.getElementById('cards-container');
    const newcardtemplate =document.getElementById('new-card-template')

    cardscontainer.innerHTML="";

    articles.forEach((article)=> {
        if (!article.urlToImage) 
            {return;}
            const cardClone = newcardtemplate.content.cloneNode(true);
            fillDatainCard(cardClone,article);
            cardscontainer.appendChild(cardClone);
       
    });
}
function fillDatainCard(cardClone,article){
    const newimage = cardClone.querySelector("#rehan");
    const newstittle = cardClone.querySelector("#newheading");
    const newssource = cardClone.querySelector("#news-source");
    const newdesk = cardClone.querySelector("#news-desk");
    

    newimage.src=article.urlToImage;
    newstittle.innerHTML=article.title
    newdesk.innerHTML=article.description

    // date for read human language
    const date=new Date(article.publishedAt).toISOString("en,us",{
        timezone:"Asia/Jakarta"

    })
    newssource.innerHTML=`${article.source.name}•${date}`
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blanks")
    })
}
function onNaveitemclick(id){
    fatchnews(id)
}
const searchbtn = document.getElementById("Searchbutton")
const searchtext = document.getElementById("searchbar");

searchtext.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchbtn.click(); // Trigger the button click when 'Enter' is pressed
    }
});

// Optional: Add a click event for the search button
searchbtn.addEventListener('click', function() {
    const query = searchtext .value;
    // Perform your search action with the query
    console.log("Searching for: " + query);
    if (!query) {
        return
    }
    fatchnews(query)
});

const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

hamburgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});



