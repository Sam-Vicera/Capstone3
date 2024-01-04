/* Posts Page JavaScript */
"use strict";

let servicesBase;
let authService;
let postService;
let userLoginData;

document.addEventListener("DOMContentLoaded", () => {
    servicesBase = new ServicesBase();
    authService = new AuthService();
    postService = new PostService();

    userLoginData = authService.getLoginData();

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", authService.logout);

    fetchPosts();
})

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {

    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el , i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className == 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift())
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const ourCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
ourCarousel.setControls();
ourCarousel.useControls();

/* Sidepanel Functionality */
function openNav() {
    document.querySelector('#sidepanel').style.width = '250px';
}
function closeNav() {
    document.querySelector('#sidepanel').style.width = '0';
}


async function fetchPosts() {
    await postService.getAll().then(data => {
        const posts = data;
        displayBlogPosts(posts)
    });
}


function displayBlogPosts(posts) {
    for (let i = 1; i < 6; i++) {
        addBlogPost(posts, i);
    }
}

function addBlogPost(posts, postNumber) {
    let currentUserNameValue = document.getElementById(`usernameContainer${postNumber}`).innerText;
    let currentPostTitle = document.getElementById(`blogPost${postNumber}Title`).innerText;
    let currentPostText = document.getElementById(`blogPost${postNumber}Text`).innerText;
    let currentPostTime = document.getElementById(`blogPost${postNumber}TimeDisplay`).innerText;
    
    let currentPost = posts[postNumber];
    
    currentUserNameValue.innerText = "";
    `From User:${currentPost.username}`;
    currentPostTitle = currentPost._id;
    currentPostText = currentPost.text;
    let currentPostDate = currentPost.createdAt.substring("2024","T");
    let currentPostHour = currentPost.createdAt.substring("T", -1);
    currentPostTime = `${currentPostDate}, ${currentPostHour}`;
}

