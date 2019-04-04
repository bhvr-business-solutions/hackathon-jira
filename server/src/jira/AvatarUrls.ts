import { PropertyCheck } from 'node-typechecker';

export class AvatarUrls {
  @PropertyCheck()
  public readonly '48x48': string;
  @PropertyCheck()
  public readonly '24x24': string;
  @PropertyCheck()
  public readonly '16x16': string;
  @PropertyCheck()
  public readonly '32x32': string;
}
