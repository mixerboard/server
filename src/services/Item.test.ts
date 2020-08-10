import Item from "./Item";

describe("item", () => {
  it("constructs", () => {
    expect.assertions(2);

    const item = new Item("name");

    expect(item).toHaveProperty("id");
    expect(item.name).toBe("name");
  });
});
