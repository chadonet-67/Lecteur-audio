// selection des elements du DOM sur les quels on doit interagir

const player = document.getElementById('player');
const playerBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const loopBtn = document.getElementById('loop');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const volProgress = document.getElementById('vol-progress');
const volContainer = document.getElementById('vol-container');
  
// tous les fichiers songs a lire 

const songs = ['sm1','sm2','sm3'];

//variables
let songIndex = 0;
let isStopped = true;
let islooping = true;

// volume 
volProgress.style.width = `${audio.volume * 100}%`;
const currentSong = songs[songIndex];

loadSong(currentSong);

// fonction permerttant de charger les details du song a jouer

function loadSong(song){
    title.innerText = song;
    audio.src = ` music/${song}.mp3`;
    cover.src = ` cover/${song}.jpeg`;

}
//creation des evenements 

function changeClasses(e,c1,c2){
    e.classList.remove(c1);
    e.classList.add(c2);
}
// fonction permettant de jouer le song
function playSong(song){

    if(isStopped){
        loadSong(song);
        cover.alt = song;
    }
    changeClasses(playerBtn.querySelector('i.fas'),'fa-play','fa-pause');
    playerBtn.querySelector('i.fas').style.color ='#00ff00';
     document.getElementById('music-container').classList.remove('disable-animation');
    changeClasses(player,'stop','play')
     

     audio.play();
}

// permert de mettre le song en pause
function pauseSong(){
    player.classList.remove('play');
    changeClasses( playerBtn.querySelector('i.fas'),'fa-pause','fa-play');
    playerBtn.querySelector('i.fas').style.color = '#fff';
    document.getElementById('music-con  tainer').classList.add('disable-animation');
    audio.pause();
}

//permet d'arreter un song en cours de lecture
stopBtn.addEventListener('click', function stopsong(){
    document.getElementById('music-container').classList.add('disable-animation');
    changeClasses( playerBtn.querySelector('i.fas'),'fa-pause','fa-play');
   
    playerBtn.querySelector('i.fas').style.color = '#fff';
    changeClasses(player,'play','stop');
 
    title.innerText = 'Titre';
     audio.pause();
     audio.currentTime = 0;
     cover.alt = ' ';
     isStopped = true;
});
//permet de lancer ou d'arreter le song
playerBtn.addEventListener('click',function playPaused(){
    const isplaying = player.classList.contains('play');
    isplaying ? pauseSong() : playSong(currentSong);
});
// permettant d'aller au song precedent

prevBtn.addEventListener('click',function prevsong(){
     
     songIndex--;
     songIndex < 0 ? songIndex = songs.length - 1 : songIndex;
     loadSong(songs[songIndex]);
     playSong(songs[songIndex]);
});

// fonction d'aller au song suivant
nextBtn.addEventListener('click', function nextsong(){
      songIndex++;
      songIndex > songs.length - 1 ? songIndex = 0 : songIndex;
      loadSong(songs[songIndex]);
      playSong(songs[songIndex]);
});

// permet de mettre a jour la bar de progression du song
audio.addEventListener('timeupdate' ,function TimeProgressBar(e){
   const {duration, currentTime} = e.target;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
});

// mettre a jour la bar de progression
progressContainer.addEventListener('click', function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;

    if(!player.classList.contains('stop')){
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

// permet de baiser le volume
volDownBtn.addEventListener('click', function reduceSongVol(){
    if(audio.volume > .1){
        audio.volume -= .1;
volProgress.style.width = `${audio.volume * 100}%`;

    }
     if(audio.volume <= .1){
         audio.volume = 0.0;
         audio.muted = true;
volProgress.style.width = $0;

         changeClasses(volDownBtn.querySelector('i.fas'),'fa-volume-down','fa-volume-mute');
     }
});
//permet d'augmenter le volume
volUpBtn.addEventListener('click', function increasesogVol(){
      if(audio.volume < .9){
          audio.muted = false;
          audio.volume += .1;
          changeClasses(volDownBtn.querySelector('i.fas'),'fa-volume-mute','fa-volume-down');
      }
}); 
// met a jout le volumepa l'utilsateur
progressContainer.addEventListener('click', function updateVol(e){
    const width = this.clientWidth;
    const clickX = e.target;
    audio.volume = (clickX / width);
volProgress.style.width = `${audio.volume * 100}%`;

})
//permet d'affcher une erreur le song n'a été trouvé
audio.addEventListener('error', function audioerreur(){
    title.innerText = "Erreur du chagement";
});