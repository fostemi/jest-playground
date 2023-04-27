const filterByTerm = require('../src/filterByTerm')

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    // actual test
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];
    const emptyInput = []

    const output = [{ id: 3, url: "https://www.link3.dev" }];
    const urlOutput = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" }
    ]

    expect(filterByTerm(input, "link")).toEqual(output);
    expect(filterByTerm(input, "LINK")).toEqual(output);
    expect(filterByTerm(input, "uRl")).toEqual(urlOutput);
    expect(() => {filterByTerm(input, "")}).toThrow("searchTerm cannot be empty");
    expect(() => {filterByTerm(emptyInput, "link")}).toThrow("inputArr cannot be empty");
  });
});
