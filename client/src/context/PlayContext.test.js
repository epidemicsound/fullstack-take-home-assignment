import React from "react";
import { render, act } from "@testing-library/react";
import PlayProvider, { usePlay } from "./PlayContext";

describe("PlayProvider", () => {
  it("provides the correct initial values", () => {
    let contextValue;

    render(
      <PlayProvider>
        <TestComponent />
      </PlayProvider>,
    );

    function TestComponent() {
      contextValue = usePlay();
      return null;
    }

    expect(contextValue.isPlaying).toBe(false);
    expect(contextValue.currentTrack).toBe("");
  });

  it("updates context values correctly", () => {
    let contextValue;

    const { rerender } = render(
      <PlayProvider>
        <TestComponent />
      </PlayProvider>,
    );

    function TestComponent() {
      contextValue = usePlay();
      return null;
    }

    act(() => {
      contextValue.setIsPlaying(true);
      contextValue.setCurrentTrack("Track 1");
    });

    expect(contextValue.isPlaying).toBe(true);
    expect(contextValue.currentTrack).toBe("Track 1");

    rerender(
      <PlayProvider>
        <TestComponent />
      </PlayProvider>,
    );

    expect(contextValue.isPlaying).toBe(true);
    expect(contextValue.currentTrack).toBe("Track 1");
  });
});
