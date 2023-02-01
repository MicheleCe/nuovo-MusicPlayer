const API_STRIVES_SCHOOL = `https://striveschool-api.herokuapp.com/api/deezer/search`

window.onload = (event) => {
  if (!localStorage.getItem("favourites")) {
      localStorage.setItem("favourites", "[]")
  }
  if (!localStorage.getItem("favourites1")) {
      localStorage.setItem("favourites1", "[]")
  }
  renderFavouritesArtist()
  renderFavouritesSongs()
};

function handleSearchOnClick (){
  document.querySelector('.containerJs1').innerHTML = " "
  let form1Text = document.getElementById("form1").value
  let queryToSearch = API_STRIVES_SCHOOL + '?q=' + form1Text
  
  //console.log(queryToSearch);
  songSearch(queryToSearch)
}

const songSearch = (input) => {
  fetch(input)
  .then((res) => {
      if (res.ok) {
          return res.json();
      } else {
          console.error("la richiesta non e andata a buon fine");
      }
  })
  .then((jsonPromise) => {
      let data = jsonPromise.data;
      console.log(data);
      data.forEach((element, i) => {
          let listReference = document.querySelector('.containerJs1')
          listReference.innerHTML += containerAlbum(
              element.title_short,
              element.album.cover_big,
              element.artist.name,
              element.album.title,
              element.artist.picture,
              element.preview,
              element.id,
              i
          )
      })
  })
}

function containerAlbum(songTitle, albumCover, artistName, albumtitle, artistPicture, track, id, i) {
  like.onclick = () => {
    like.style.display = 'none'
    liked.style.display = 'block'
    handleArtistFunc(songTitle, artistName,albumCover,track,insert = 1, elIndex = -1)
}
  return `
  <div class="classCont col-12 col-md-3 text-light">
      <div class="card shadow my-3 position-relative border-0 bg-dark m-3" id="${id}" >
          <h5 class="card-title fw-bold m-3 text-center h-25">${songTitle}</h5>
          <button onclick='playMusic("${track}", "${songTitle}", "${artistName}")'>play</button>
          <img src=${albumCover} class="card-img-top w-100 border-3">
          <button class=" border-0 artist position-absolute badge rounded-rounded bg-success end-0 bottom-0 fs-6 m-2 text-light" onclick='handleArtistFunc("${songTitle}", "${artistName}", "${albumCover}","${track}")'>Add Album</button>
          <button class=" border-0 song position-absolute badge rounded-rounded bg-danger start-0 bottom-0 fs-6 m-2 text-light" onclick='handleSongsFunc("${songTitle}", "${artistName}", "${albumCover}","${track}")'>Add song</button>
          <div class="d-flex">
              <div class="col-6">
                  <h5 class="card-title text-primary fw-bold my-4 text-center">${artistName}</h5>
                  <h5 class="card-title fs-6 my-3 text-center">${albumtitle}</h5>
              </div>
              <img class="col-6 my-4" src=${artistPicture}>
          </div>
      </div>
  </div>`
}
function handleArtistFunc(title, name, cover, track, insert = 1, elIndex = -1) {
  let favId = `id="fav${elIndex}"`
  if (elIndex === -1){
      let favv = localStorage.getItem("favourites")
      favv = JSON.parse(favv)
      elIndex = favv.length 
      favId = `id="fav${elIndex}"`
      console.log(favId);
  }
  if (insert) {
      addFavourite([title, name, cover, track])
  }
  let artists = document.querySelector('.favArtist');
  artists.innerHTML += `
  <div class=" classCont col-6 col-md-3 m-4 d-flex flex-wrap" ${favId}>
    <div class="card shadow my-3 position-relative border-0">
    <button onclick='playMusic("${track}", "${title}", "${name}")'>play</button>
    <button class="album position-absolute badge rounded-rounded bg-primary end-0 top-0 fs-6 text-light" onclick='removeFavourite(${elIndex})'>X</button>
      <h5 class="card-title fw-bold m-4 text-center">${title}</h5>
      <img class="col-6 mt-3 w-100" src=${cover}>
      <h5 class="card-title m-1 text-center">${name}</h5>
    </div>
  </div>
  `
}

function handleSongsFunc(title, name, cover, track, insert = 1, elIndex = -1) {
  let favId = `id="favour${elIndex}"`
  if (elIndex === -1){
      let favv = localStorage.getItem("favourites1")
      favv = JSON.parse(favv)
      elIndex = favv.length
      console.log(elIndex);
      favId = `id="favour${elIndex}"`
  }
  if (insert) {
    addFavourite1([title, name, cover, track]),
    console.log(addFavourite1());
  } 
  let songs = document.querySelector('.favSong');
  songs.innerHTML += `
  <div class=" classCont col-4 col-md-3 mx-2 d-flex" ${favId}>
    <div class="card shadow my-3 position-relative border-0" >
    <button onclick='playMusic("${track}", "${title}", "${name}")'>play</button>
    <button class="album position-absolute badge rounded-rounded bg-primary ms-50 fs-6 my-5 text-light" onclick='removeFavourite1(${elIndex})'>X</button>
      <h5 class="card-title fw-bold m-3 text-center h-25">Song Title: ${title}</h5>
      <h5 class="card-title fw-bold m-3 text-center h-25">Artist: ${name}</h5>
      <div class="d-flex">
          <img class="col-6 my-4" src=${cover}>
      </div>
    </div>
  </div>
  `
}
function addFavourite(arr) {
  let favourites = JSON.parse(localStorage.getItem("favourites"))
  favourites.push(arr)
  localStorage.setItem("favourites", JSON.stringify(favourites))
}
function addFavourite1(arr) {
  let favourites = JSON.parse(localStorage.getItem("favourites1"))
  favourites.push(arr)
  localStorage.setItem("favourites1", JSON.stringify(favourites))
}

function renderFavouritesArtist() {
  let fav = JSON.parse(localStorage.getItem("favourites"))
  fav.forEach((element, i) => {
      let title = element[0]
      let name = element[1]
      let cover = element[2]
      let track = element[3]
      console.log(track);
      handleArtistFunc(title, name, cover, track, 0, i)
  });
}
function renderFavouritesSongs() {
  let fav = JSON.parse(localStorage.getItem("favourites1"))
  fav.forEach((element, i) => {
      let title = element[0]
      let name = element[1]
      let cover = element[2]
      let track = element[3]
      console.log();
      handleSongsFunc(title, name, cover, track, 0, i)
  });
}

function removeFavourite(elIndex) {
  if (elIndex === -1){
      return
  } 
  document.getElementById(`fav${elIndex}`).remove()
  let session = localStorage.getItem("favourites")
  let favs = JSON.parse(session)
  favs.splice(elIndex, 1)
  console.log(favs);
  localStorage.setItem("favourites", JSON.stringify(favs))
}

function removeFavourite1(elIndex) {
  if (elIndex === -1){
      return
  } 
  document.getElementById(`favour${elIndex}`).remove()
  let session1 = localStorage.getItem("favourites1")
  let favs = JSON.parse(session1)
  favs.splice(elIndex, 1)
  console.log(favs);
  localStorage.setItem("favourites1", JSON.stringify(favs))
}


let audio = new Audio()

function playMusic(song, title, artist) {
  document.querySelector(".SongTitle").innerText = title
  document.querySelector(".ArtistName").innerText = artist
  let m = song
  audio.src = m;
  audio.play();
  audio.addEventListener("loadedmetadata", () => {
    document.querySelector(".totalDuration").innerHTML = `${updateTime(audio.duration)}`;
    let maxVolume = audio.volume = 1
    // minVolume = (audio.volume = 0)
    // if (mouseIsDown === true) {
    //   let v = (volume.offsetWidth/volumeRange.offsetWidth) * (maxVolume +2)
    //   return 
    // }
    setInterval(() => {
      if (volume.offsetWidth > (volumeRange.offsetWidth*50)/100 && volume.offsetWidth !== 0){
        document.querySelector('.bi-volume-up').style.display = "block"
        document.querySelector('.bi-volume-up').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-down').style.display = "none"
        document.querySelector('.bi-volume-mute').style.display = "none"
      } else {              
        document.querySelector('.bi-volume-up').style.display = "none"
        document.querySelector('.bi-volume-down').style.display = "block"
        document.querySelector('.bi-volume-down').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-mute').style.display = "none"}
      if (volume.offsetWidth === 0){
        document.querySelector('.bi-volume-mute').style.display = "block"
        document.querySelector('.bi-volume-mute').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-up').style.display = "none"
        document.querySelector('.bi-volume-down').style.display = "none"
      }
      if (mouseIsDownOnVolume === true) {
        console.log("pppppp");
        let x = ((volume.offsetWidth/volumeRange.offsetWidth)) * maxVolume
        return audio.volume = x
        // console.log("p", volume.offsetWidth);
        // console.log("t", volumeRange.offsetWidth);
      }
    },100)
    setInterval(() => {
      if (mouseIsDownOnPlayer === true) {
        console.log("pppppp");
        let x = (player.offsetWidth/playerRange.offsetWidth) *audio.duration
        return audio.currentTime = x
      }
      // console.log("q", player.offsetWidth);
      // console.log("e", playerRange.offsetWidth);
      // console.log("r", audio.duration);
      document.querySelector(".current-time").innerHTML = `${updateTime(audio.currentTime)}`;
      player.style.width = `${Math.round((audio.currentTime/audio.duration)*playerRange.offsetWidth)}px`
    }, 10)
  })  
}

let liked = document.querySelector(".liked")
let like = document.querySelector(".like")

let playing = document.querySelector(".play")
let paused = document.querySelector(".pause")


playing.onclick = () => {
  audio.play()
}
paused.onclick = () => {
  audio.pause()
}

audio.onpause= () => {
  playing.style.display = 'block'
  paused.style.display = 'none';
};

audio.onplay = () => {
  playing.style.display = 'none'
  paused.style.display = 'block';
};

let rep = document.querySelector(".repeat")
let rep1 = document.querySelector(".repeat1")

rep.onclick = () => {
    rep.style.display = 'none'
    rep1.style.display = 'block'
    rep1.style.color = 'green'
    audio.loop = false
}

function enableLoop() { 
  audio.loop = true;
} 

rep1.onclick = () => {
    enableLoop()
    rep.style.display = 'block'
    rep1.style.display = 'none'
}




// The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.
//Mousedown is fired while the button is initially pressed, mouseup is fired when the button is released.


const volume = document.querySelector('.volume');
const volumeRange = document.querySelector('.volume-range');
const volumeContainer = document.querySelector('.volume-container');
const volumeBtn = document.querySelector('.volume-button');
const volumeRangeWidth = volumeRange.getBoundingClientRect().width;

const player = document.querySelector('.player');
const playerRange = document.querySelector('.player-range');
const playerContainer = document.querySelector('.player-container');
const playerBtn = document.querySelector('.player-button');
const playerRangeWidth = playerRange.getBoundingClientRect().width;


volumeContainer.addEventListener("mouseup", up);
volumeContainer.addEventListener("mousedown", downOnVolume);
volumeContainer.addEventListener("mousedown", volumeSlide);
volumeContainer.addEventListener("mousemove", volumeSlide);

playerContainer.addEventListener("mouseup", up);
playerContainer.addEventListener("mousedown", downOnPlayer);
playerContainer.addEventListener("mousedown", playerSlide);
playerContainer.addEventListener("mousemove", playerSlide);


let mouseIsDownOnPlayer = false;
let mouseIsDownOnVolume = false

function downOnVolume() {
  mouseIsDownOnVolume = true;
}

function downOnPlayer() {
  mouseIsDownOnPlayer = true;
}

function up() {
  mouseIsDownOnPlayer = false;
  mouseIsDownOnVolume = false
}
function volumeSlide(event) {
  if (mouseIsDownOnVolume === true) {
    let x = Math.floor(event.offsetX );
    let pointer = volume.style.width = (x) + 'px';
    console.log(pointer);
  }
}

function playerSlide(event) {
  if (mouseIsDownOnPlayer === true) {
    let x = Math.floor(event.offsetX);
    let pointer = player.style.width = (x) + 'px';
    console.log(pointer);
  }
}

function updateTime (time) {
  const seconds = String(Math.floor(time % 60) || 0).padStart("2", "0");
  const minutes = String(Math.floor(time / 60) || 0).padStart('0');
  let timer = minutes + "" + seconds
  return timer
}

