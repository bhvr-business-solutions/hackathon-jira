import { PropertyCheck } from 'node-typechecker';
import { AvatarUrls } from './AvatarUrls';

export class User {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly name: string;
  @PropertyCheck()
  public readonly key: string;
  @PropertyCheck()
  public readonly accountId: string;
  @PropertyCheck()
  public readonly emailAddress: string;
  @PropertyCheck()
  public readonly avatarUrls: AvatarUrls;
  @PropertyCheck()
  public readonly displayName: string;
  @PropertyCheck()
  public readonly active: boolean;
  @PropertyCheck()
  public readonly timeZone: string;
  @PropertyCheck()
  public readonly accountType: string;
}
