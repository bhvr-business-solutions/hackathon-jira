import * as io from 'socket.io';
import { Server } from 'http';

export class WebSocket {
  public readonly server: io.Server;
  private readonly eventsRoom: string = 'jira';

  constructor(app: Server) {
    this.server = io({
      serveClient: true
    });
    this.server.attach(app);
  }

  private sendEventToClients(event: string, data: any): void {
    this.server.to(this.eventsRoom).emit(event, data);
  }

  public handleNewConnection(socket: io.Socket): void {
    socket.join(this.eventsRoom);
    console.log('Client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    })
  }
}
