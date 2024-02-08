const postList = document.querySelector(".post-cnt");
const loader = document.querySelector(".loader");

let limit = 3;
let page = 1;
let isLoading = false;

function createPost(obj) {
  const post = document.createElement("li");
  post.className = "post";
  post.innerHTML = `
    <span>${obj.id}</span>
    <h3>${obj.title}</h3>
    <p>${obj.body}</p>
  `;
  return post;
}

async function loadNewPostsHandle() {
  page++;
  loader.classList.add("loading");
  await addNewPosts();
  loader.classList.remove("loading");
}

async function getNewPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  const reponse = await fetch(url);
  const data = await reponse.json();
  return data;
}

async function addNewPosts() {
  const data = await getNewPosts();
  for (const i of data) postList.append(createPost(i));
}
// Inintally show 3 posts
addNewPosts();

window.addEventListener("scroll", async () => {
  //document.documentElement -> This is root element of the document -> <html>
  /*
    scrollHeight -> The height of the Area of Scrolling
                    in This case wholePage
    scrollTop -> The height of currHeight on the page to Top of the page
    clientHeight -> user window height
  */
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  /*
   Because we want to Handle if we scroll to avoid multiple loading
   As scrolling during EventListener is executing
   we add a bool var isLoding so that when function is first time
   exexuting we block any other EventListener function to exectute by this bool

  */
  if (scrollHeight - 8 <= scrollTop + clientHeight && !isLoading) {
    isLoading = true;
    // Wait to end then back it to false
    await loadNewPostsHandle();
    isLoading = false;
  }
});
