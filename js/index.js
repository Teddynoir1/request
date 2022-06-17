const container = document.querySelector(".container");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => e.preventDefault());

let postsToBeRendered = [];

const renderPosts = (incomingPosts) =>
  incomingPosts.forEach((post) => {
    const postCard = `
        <div class="card" id=${post.id} >
          <div class="box">
            <div class="content">
              <h2>${post.id}</h2>
              <h3>${post.title}</h3>
              <a href="/post.html?id=${post.id}">Read More</a>
              <a>Update</a>
              <button onclick="deletePost(${post.id})" class="btn">
                <i class="fa fa-trash"></i> Trash
              </button>
            </div>
          </div>
        </div>`;
    container.insertAdjacentHTML("beforeend", postCard);
  });

//
//
// GET POST
//
//

(async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });
    postsToBeRendered = data.slice(0, 12);
    const greg =
      JSON.parse(window.sessionStorage.getItem(`posts`)) ?? postsToBeRendered;
    renderPosts(greg);
    window.sessionStorage.setItem(`posts`, JSON.stringify(postsToBeRendered));
  } catch (error) {
    console.log(error);
  }
})();

//
//
// CREATE POST
//
//

const createNewPost = async () => {
  const postBody = document.getElementById("post_body");
  const postTitle = document.getElementById("post_title");

  try {
    const { data } = await axios({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title: postTitle.value,
        body: postBody.value,
        userId: 100,
      },
    });
    renderPosts([data]);
    window.sessionStorage.setItem(
      `posts`,
      JSON.stringify([data, ...postsToBeRendered])
    );
  } catch (error) {
    console.log(error);
  }
};

//
//
// DELETE POST
//
//
const deletePost = async (id) => {
  try {
    await axios({
      method: "DELETE",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    });
    const post = document.getElementById(`${id}`);
    post.remove();
  } catch (error) {
    console.log(error);
  }
};
