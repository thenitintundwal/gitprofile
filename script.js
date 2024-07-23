const heading = document.querySelector("#heading");
const modes = document.querySelector("#mode");
const dark = document.querySelector("#dark");
const light = document.querySelector("#light-t");
const form = document.querySelector("form");
const input = document.querySelector("#input");
const searchBtn = document.querySelector("button");
const profileImg = document.querySelector("#profile-img");
const userName = document.querySelector("#username");
const userlink = document.querySelector("#user-link");
const userbio = document.querySelector("#discription");
const date = document.querySelector(".date");
const repo = document.querySelector("#repo");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const userlocation = document.querySelector("#location");
const twitter = document.querySelector("#twitter");
const biolink = document.querySelector("#bio");
const company = document.querySelector("#company");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const url = "https://api.github.com/users/";
const imgurl = document.querySelector(".img-seaction");
const content = document.querySelector(".content");
const error = document.querySelector("#error");

// Event Listners //

modes.addEventListener("click", handleModes);

form.addEventListener("submit", handleSearchBar);

// Functions //

// Handling dark and light mode //

function handleModes() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    modes.src = "./assets/images/moon-icon.svg";
    light.innerText = "DARK";
  } else {
    modes.src = "./assets/images/sun-icon.svg";
    light.innerText = "LIGHT";
  }
}

// Handling search bar //

function handleSearchBar(e) {
  e.preventDefault();
  let user = input.value;
  fetchapi(user);
}

// Updating ui //

function handleApi(data) {
  profileImg.src = `${data?.avatar_url}`;
  userName.innerText = data.name == null ? "Not Available" : `${data.name}`;
  userlink.innerText = `@${data?.login}`;
  // if (data?.bio == null) {
  //   userbio.innerText = "This profile has no bio";
  // } else {
  //   userbio.innerText = data?.bio;
  // }

  // OR //

  userbio.innerText =
    data.bio == null ? "This profile has no bio" : `${data?.bio}`;
  repo.innerText = data?.public_repos;
  followers.innerText = data?.followers;
  following.innerText = data?.following;
  userlocation.innerText =
    data.location == null ? "Not Available" : `${data.location}`;
  biolink.innerText = data.blog == "" ? "Not Available" : `${data.blog}`;
  twitter.innerText =
    data.twitter_username == null
      ? "Not Available"
      : `${data.twitter_username}`;
  company.innerText =
    data.company == null ? "Not Available" : `${data.company}`;
  handledate = data.created_at.split("T").shift().split("-");
  date.innerText = `Joined ${handledate[2]} ${months[handledate[1] - 1]} ${
    handledate[0]
  }`;
}

// Fetching Git Api //

async function fetchapi(user) {
  try {
    const responce = await fetch(url + user);
    const data = await responce.json();
    console.log(data);
    handleApi(data);
  } catch (e) {
    alert("User Not Found");
  }
}
