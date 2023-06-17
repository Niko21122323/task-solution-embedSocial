const layout = document.querySelector(".posts-container"); // get the post-container
const loadMoreButton = document.getElementById("load-more-button"); // get the load more btn

let visiblePosts = 4; // number of posts to be displayed
const postsPerPage = 4; // number of posts to be added when the button is clicked

// // light/dark theme
const switchInput = document.querySelector(".switch input");
const body = document.querySelector("body");
switchInput.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
});

// fetch data and display initial posts
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    displayPosts(data);
  });

// function to toggle fullscreen class on the clicked image
function toggleFullscreen(event) {
  const image = event.target;
  image.classList.toggle("fullscreen");
}

// load more posts when the button is clicked
loadMoreButton.addEventListener("click", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      loadMorePosts(data);
    });
});

// function to toggle fullscreen class on the clicked image
function toggleFullscreen(event) {
  const image = event.target;
  image.classList.toggle("fullscreen");
}

// Display posts
function displayPosts(data) {
  layout.innerHTML = ""; // clear existing posts
  // display 4 posts at start
  for (let i = 0; i < visiblePosts; i++) {
    const post = data[i];
    layout.insertAdjacentHTML(
      "beforeend",
      `
        <div class="post">
            <div class="post-img-container">
                <img src="${post.image}" alt="${post.type}">
            </div>
            <div class="post-content">
                <div class="user">
                    <img class="user-img" src="${post.profile_image}">
                    <p class="user-name">${post.name}</p>
                </div>
                <div class="user-caption">
                    <p>${post.caption}</p>
                </div>
                <div class="post-stats">
                    <a href="${post.source_link}" target="_blank">${post.source_type}</a>
                    <p>Likes: ${post.likes}</p>
                    <p>Date: ${post.date}</p>
                </div>
            </div>
        </div>
        `
    );
  }

  // show and hide the load more button
  if (visiblePosts < data.length) {
    loadMoreButton.style.display = "block";
  } else {
    loadMoreButton.style.display = "none";
  }

  // event lostener to the images to go full screen
  const images = document.querySelectorAll(".post-img-container img");
  images.forEach((image) => {
    image.addEventListener("click", toggleFullscreen);
  });
}

// load more posts on click
function loadMorePosts(data) {
  const remainingPosts = data.length - visiblePosts;
  const postsToAdd = Math.min(postsPerPage, remainingPosts);

  // Display the next set of posts
  for (let i = visiblePosts; i < visiblePosts + postsToAdd; i++) {
    const post = data[i];
    layout.insertAdjacentHTML(
      "beforeend",
      `<div class="post">
              <div class="post-img-container">
                  <img src="${post.image}" alt="${post.type}">
              </div>
              <div class="post-content">
                  <div class="user">
                      <img class="user-img" src="${post.profile_image}">
                      <p class="user-name">${post.name}</p>
                  </div>
                  <div class="user-caption">
                      <p>${post.caption}</p>
                  </div>
                  <div class="post-stats">
                      <a href="${post.source_link}" target="_blank">${post.source_type}</a>
                      <p>Likes: ${post.likes}</p>
                      <p>Date: ${post.date}</p>
                  </div>
              </div>
          </div>`
    );
  }

  // update number of visible posts
  visiblePosts += postsToAdd;

  // show or hide the "Load More" button
  if (visiblePosts >= data.length) {
    loadMoreButton.style.display = "none";
  }

  // add event listeners to the new images that get loaded
  const images = document.querySelectorAll(".post-img-container img");
  images.forEach((image) => {
    image.addEventListener("click", toggleFullscreen);
  });
}
