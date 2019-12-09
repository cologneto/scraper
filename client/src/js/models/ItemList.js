import { helper } from "./base";
import { serverURL } from "../config";

export default class ItemList {
  constructor() {
    this.items = [];
  }

  async getAllItems() {
    const response = await fetch(`${serverURL}items`);
    const data = await response.json();
    this.items = helper.json2array(data);
  }

  updateList(item) {
    this.items.splice(
      this.items.findIndex(i => i.id === item.id),
      1
    );
  }

  async deleteItem(item) {
    await fetch(`${serverURL}item/${item.id}`, {
      method: "delete",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
