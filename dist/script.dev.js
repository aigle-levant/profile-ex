"use strict";

// Variables
var searchBar = document.querySelector('.search');
var searchBtn = document.querySelector('.submit-btn');
var linkToProfile = document.querySelector('.profile-link');
var profilePhoto = document.querySelector('.profile-photo');
var username = document.querySelector('.user-text');
var description = document.querySelector('.user-desc');
var repositories = document.querySelector('.repositories'); //search function

searchBtn.addEventListener('click', searchForUser);

function searchForUser() {
  var input = searchBar.value.trim();
  getUser(input);
} //get user


function getUser(userId) {
  fetch("https://api.github.com/users/".concat(username)).then(function (Response) {
    return Response.json();
  }).then(function (data) {
    username.textContent = data.id;
    description.textContent = data.bio;
  }).then(function (repos) {
    repos.forEach(function (repo) {
      repositories.textContent = repo;
    });
  });
}