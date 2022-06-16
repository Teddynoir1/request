const deletePost=(posts, i)=>{

        posts.filter((post) =>{
        posts.indexOf(post)!== i
        })
        console.log(posts.length)


}
let container=document.querySelector(".container");
let posts=[];
fetch(' https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data =>{
    posts=data.slice(0,13)

        for(let i=0;  i<posts.length; i++) {

            let card = document.createElement("div");
        card.classList.add("card")
            card.innerHTML=`<div class="box">
            <div class="content">
              <h2>0${posts[i].id}</h2>
              <h3>${posts[i].title}</h3>
              <p>${posts[i].body.substring(0,50)}</p>
              <a href="about.html">Read More</a><button onclick=${() =>{deletePost(posts, i)}} class="btn"><i class="fa fa-trash"></i> Trash</button>
            </div>
          </div>`

          container.appendChild(card)
            }
    });


