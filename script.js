// Variables
let searchBar = document.querySelector('.search');
let searchBtn = document.querySelector('.submit-btn');
let linkToProfile = document.querySelector('.profile-link');
let profilePhoto = document.querySelector('.profile-photo');
let username = document.querySelector('.user-text');
let description = document.querySelector('.user-desc');
let repositories = document.querySelector('.repositories');

//search function
searchBtn.addEventListener('click', searchForUser);
function searchForUser()
{
    let input = searchBar.value.trim();
    getUser(input)
}
//get user
function getUser(userId)
{
    fetch(`https://api.github.com/users/${username}`).
    then(Response => Response.json()).
    then(data =>
    {
        username.textContent = data.id;
        description.textContent = data.bio;
    }).
    then(repos =>
    {
        repos.forEach(repo =>
        {
            repositories.textContent = repo;    
        });
    }
    )
}