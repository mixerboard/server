import Item from "./Item";

describe("Item", () => {
  it("constructs", () => {
    const item = new Item("name");

    expect(item).toHaveProperty("id");
    expect(item.name).toBe("name");
  });
});
