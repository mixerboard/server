import { v4 as uuid } from "uuid";

class Item {
  readonly id: string;

  constructor(readonly name: string) {
    this.id = uuid();
    this.name = name;
  }
}

export default Item;
