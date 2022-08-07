import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

function onPlayVideo(time) {
  console.log(time);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
}

player.on('timeupdate', throttle(onPlayVideo, 1000));

const savedCurrentTime = localStorage.getItem('videoplayer-current-time');
if (savedCurrentTime) {
  const parsedsavedCurrentTime = JSON.parse(savedCurrentTime);
  const { seconds } = parsedsavedCurrentTime;
  console.log(seconds);

  player.setCurrentTime(seconds);
}
