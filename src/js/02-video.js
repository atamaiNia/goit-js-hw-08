import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

function onPlayVideo(time) {
  console.log(time);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
}

player.on('timeupdate', throttle(onPlayVideo, 1000));

const currentTime = localStorage.getItem('videoplayer-current-time');

function savedCurrentTime(currentTime) {
  if (currentTime) {
    const parsedsavedCurrentTime = JSON.parse(currentTime);
    const { seconds } = parsedsavedCurrentTime;
    console.log(seconds);
    player.setCurrentTime(seconds);
  } else {
    parsedsavedCurrentTime = 0;
  }
}

savedCurrentTime(currentTime);
