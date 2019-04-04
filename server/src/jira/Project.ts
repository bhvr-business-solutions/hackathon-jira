import { PropertyCheck } from 'node-typechecker';
import { AvatarUrls } from './AvatarUrls';

export class Project {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck()
  public readonly key: string;
  @PropertyCheck()
  public readonly name: string;
  @PropertyCheck()
  public readonly projectTypeKey: string;
  @PropertyCheck()
  public readonly avatarUrls: AvatarUrls;
}
