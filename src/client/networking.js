import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');
const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});
// const wannaBuy = document.getElementById('wanna-buy');

export const askUserToBuy = username => {
  wannaBuy.innerHTML = '<p>Would you like to buy this property?</p><button id=\"yes\">YES</button><button id=\"no\">NO</button>';
};

export const playTheGame = () => {
  socket.emit(Constants.MSG_TYPES.START_GAME);
}

export const play = (username, user_color) => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username, user_color);
  console.log(username+" with color " + user_color + " has clicked play!");
  const go = document.getElementById('box-0');
  go.insertAdjacentHTML('beforeend','<p class=\"circle-sj\" style=\"background-color: #' + user_color +';\">'+ username +'</p>');
};

export const roll_dice = username => {
  socket.emit(Constants.MSG_TYPES.ROLL_DICE_INPUT, username);
};

export const buy_property = username => {
  socket.emit(Constants.MSG_TYPES.BUY_PROPERTY_INPUT, username);
};

export const sendBuddyMessage = () => (
  connectedPromise.then(() => {
    socket.on(Constants.MSG_TYPES.ASK_TO_BUY,printAskToBuy);
  })
);

// export const printAskToBuy = () => (
//   console.log("Do you want to buy this property?"),
//   socket.emit('<p>Do you want to buy this property?</p>'),
// );

export const connect = onGameOver => (
  console.log("got to the connect method in networking.js"),
  connectedPromise.then(() => {
    // Register callbacks
    // socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    // socket.on(Constants.MSG_TYPES.ASK_TO_BUY,askUserToBuy);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);
