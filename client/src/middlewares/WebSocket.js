import { RECEIVE_DATA } from '../actions/Application';

class WebSocket {
  static store;
  static socket;
  
  static getSocket() {
    if (!this.socket && io) {
      // Create socket
      /* global io */
      this.socket = io({
        path: '/api/ws'
      });
      
      // Automatically reconnect on disconnection
      this.socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          this.socket.connect();
        }
      });
            
      // Listen to all events on socket and dispatch them as is
      this.socket.on('scoresUpdated', (data) => {
        if (this.store) {
          this.store.dispatch({type: RECEIVE_DATA, data});
        }
      });
    }
    
    return this.socket;
  }
  
  static middleware = (store) => {
    // Save a reference to current store
    WebSocket.store = store;
    
    // Initialize socket
    WebSocket.getSocket();
    
    return (next) => async action => {     
      return next(action);
    };
  }
}

// tslint:disable-next-line:export-name
export const WebSocketMiddleware = WebSocket.middleware;
