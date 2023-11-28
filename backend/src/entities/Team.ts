//import { uuid } from "uuidv4"
import { v4 as uuid } from 'uuid';

export class Team {
  public readonly id: string

  public name: string
  public email: string
  public providedInfo: boolean
  public teamInfo: string
  
  constructor(props: Omit<Team, 'id'>, id?: string) {
    Object.assign(this, props)

    if(!id) {
      this.id = uuid() //removes the db's responsibility for specifying id ("abstracts" the infrastructure layer)
    }
  }
}