import useTracks from "./useTracks";

global.fetch = require("jest-fetch-mock");

describe("useTracks", () => {
  const ENDPOINT = `${process.env.REACT_APP_API_HOST}/tracks/`;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test("getAll fetches data from the API", async () => {
    const mockResponse = [
      { id: 1, title: "Track 1" },
      { id: 2, title: "Track 2" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const { getAll } = useTracks();
    const data = await getAll();

    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(ENDPOINT, { mode: "cors" });
  });

  test("getAll handles fetch errors", async () => {
    fetch.mockRejectOnce(new Error("API is down"));

    const { getAll } = useTracks();

    try {
      await getAll();
    } catch (error) {
      expect(error.message).toBe("API is down");
    }

    expect(fetch).toHaveBeenCalledWith(ENDPOINT, { mode: "cors" });
  });
});
