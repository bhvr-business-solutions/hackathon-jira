import { PropertyCheck } from 'node-typechecker';

class ChangelogItem {
  @PropertyCheck()
  public readonly field: string;
  @PropertyCheck()
  public readonly fieldtype: string;
  @PropertyCheck()
  public readonly fieldId: string;
  @PropertyCheck({nullable: true})
  public readonly from?: any;
  @PropertyCheck({nullable: true})
  public readonly fromString?: string;
  @PropertyCheck({nullable: true})
  public readonly to?: any;
  @PropertyCheck({nullable: true})
  public readonly toString?: string;
}

export class Changelog {
  @PropertyCheck()
  public readonly id: string;
  @PropertyCheck({type: Array, arrayType: ChangelogItem})
  public readonly items: ReadonlyArray<ChangelogItem>;
}
