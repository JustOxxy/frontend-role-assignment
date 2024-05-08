import { getResolution } from "./getResolution";

describe("getResolution", () => {
  it("returns resolution", () => {
    const center = { lat: 55.6, lng: 12.5 };
    const zoom = 17;

    const resolution = getResolution(center, zoom);
    expect(resolution).toEqual(0.6747562200345529);
  });
});
