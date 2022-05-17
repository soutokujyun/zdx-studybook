// import './index.css'
// import photo from './photo.jpg';

// const img = new Image();
// img.src = photo;
// document.body.appendChild(img);


import Vue from 'vue'
import App from './view/App.vue'

new Vue({
    el: "#app",
    render: (h) => h(App)
})