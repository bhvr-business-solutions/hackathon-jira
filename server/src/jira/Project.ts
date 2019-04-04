import { PropertyCheck } from 'node-typechecker';

export class project {
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
        "avatarUrls": {
          "48x48": "https://behaviour.atlassian.net/secure/projectavatar?pid=11204&avatarId=12329",
          "24x24": "https://behaviour.atlassian.net/secure/projectavatar?size=small&pid=11204&avatarId=12329",
          "16x16": "https://behaviour.atlassian.net/secure/projectavatar?size=xsmall&pid=11204&avatarId=12329",
          "32x32": "https://behaviour.atlassian.net/secure/projectavatar?size=medium&pid=11204&avatarId=12329"
        }
}
