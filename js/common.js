"use strict";

document.title = 'Power Gym';

const logoTitleContainer = document.querySelector('.logo-title-container').innerHTML = `
  <img class="dumbbell-logo" src="../../icons/dumbbell.png" alt="Dumbbell">
  <h3><a class="title" href="../../index.html">POWER GYM</a></h3>
`;
function displayNav(aboutus, contactus, help) {
  document.querySelector('nav').innerHTML = `
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href=${aboutus}>ABOUT US</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href=${contactus}>Contact Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href=${help}>Help</a>
      </li>
    </ul>
  `;
}

