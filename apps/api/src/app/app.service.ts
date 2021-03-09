import { Injectable } from "@nestjs/common";
import { Something } from '@solid-octo-couscous/model';

@Injectable()
export class AppService {
  public readonly database: Array<Something> = [
    {
      description: 'I am the first element in the list. WHOA'
    } as Something,
    {
      description: 'I am the second element in the list. WHOA 2'
    } as Something,
  ];

  public getAll(): Array<Something> {
    return [...this.database];
  }
}
