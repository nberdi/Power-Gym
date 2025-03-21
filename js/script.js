"use strict";

document.title = 'Power Gym';

document.querySelector('header').innerHTML = `
  <div class="logo-title-container">
    <img class="dumbbell-logo" src="../icons/dumbbell.png" alt="Dumbbell">
    <h3><a class="title" href="../index.html">POWER GYM</a></h3>
  </div>
  <nav>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="./nav/aboutus.html">ABOUT US</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./nav/contact.html">Contact Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./nav/help.html">Help</a>
      </li>
    </ul>
  </nav>
`;
