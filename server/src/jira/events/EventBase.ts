import { User } from '../User';

export abstract class EventBase {
  public readonly timestamp: number;
  public readonly webhookEvent: string;
  public readonly user: User;
}
