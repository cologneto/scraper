import { serverURL } from "../config";

export default class Item {
  constructor(id, imageURL, model, prodCode) {
    this.id = id;
    this.imageURL = imageURL;
    this.model = model;
    this.prodCode = prodCode;
  }

  async getItem() {
    const response = await fetch(`${serverURL}item/${this.id}`);
    const data = await response.json();
    this.imageURL = data.imageURL;
    this.model = data.model;
    this.prodCode = data.prodCode;
  }

  async updateItem() {
    await fetch(`${serverURL}item/${this.id}`, {
      method: "put",
      body: JSON.stringify({
        model: this.model,
        prodCode: this.prodCode,
        imageURL: this.imageURL
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
