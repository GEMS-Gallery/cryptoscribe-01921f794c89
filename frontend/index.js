import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

document.addEventListener("DOMContentLoaded", async () => {
  const quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('new-post-btn');
  const postForm = document.getElementById('post-form');
  const submitPostBtn = document.getElementById('submit-post-btn');
  const postsContainer = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    postForm.classList.toggle('hidden');
  });

  submitPostBtn.addEventListener('click', async () => {
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const body = quill.root.innerHTML;

    if (title && author && body) {
      await backend.addPost(title, body, author);
      loadPosts();
      postForm.classList.add('hidden');
    }
  });

  async function loadPosts() {
    const posts = await backend.getPosts();
    postsContainer.innerHTML = posts.map(post => `
      <div class="post">
        <h2>${post.title}</h2>
        <p><em>by ${post.author}</em></p>
        <div>${post.body}</div>
      </div>
    `).join('');
  }

  loadPosts();
});
