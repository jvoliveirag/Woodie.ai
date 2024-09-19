//import { uuid } from "uuidv4"
import { v4 as uuid } from 'uuid';

export class Prompt {
  public readonly id: string

  public title: string
  public template: string
  
  constructor(props: Omit<Prompt, 'id'>, id?: string) {
    Object.assign(this, props)

    if(!id) {
      this.id = uuid() //removes the db's responsibility for specifying id ("abstracts" the infrastructure layer)
    }
  }
}