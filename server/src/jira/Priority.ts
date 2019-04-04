import { PropertyCheck } from 'node-typechecker';

export class Priority {
  @PropertyCheck()
  public readonly self: string;
  @PropertyCheck()
  public readonly iconUrl: string;
  @PropertyCheck()
  public readonly name: string;
  @PropertyCheck()
  public readonly id: string;
}
