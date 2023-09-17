import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import AudioPlayer from "./AudioPlayer";
import PlayProvider from "../../context/PlayContext";

const mockedTrack = {
  id: "id",
  title: "Where the Sunflowers Bloom",
  length: 194,
  bpm: 114,
  genres: ["Indie Pop"],
  moods: ["Happy", "Hopeful"],
  main_artists: ["Elin Sandberg"],
  audio:
    "https://storage.googleapis.com/tech-coding-interview-assets/em55KruCAt.mp3",
};

const playMock = jest.fn();
beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(playMock);
});

afterAll(() => {
  HTMLMediaElement.prototype.play.mockRestore();
});

describe("AudioPlayer", () => {
  let getByTestIdFunction;

  beforeEach(() => {
    const { getByTestId } = render(
      <PlayProvider>
        <AudioPlayer track={mockedTrack} />
      </PlayProvider>,
    );
    getByTestIdFunction = getByTestId;
  });

  it("renders the play button", () => {
    const playButton = getByTestIdFunction("play-button");
    expect(playButton).toBeInTheDocument();
  });

  it("renders the track title and artist", () => {
    const trackTitle = getByTestIdFunction("track-title");
    const trackArtist = getByTestIdFunction("track-artist");

    expect(trackTitle).toBeInTheDocument();
    expect(trackTitle.textContent).toBe(mockedTrack.title);

    expect(trackArtist).toBeInTheDocument();
    expect(trackArtist.textContent).toBe(mockedTrack.main_artists[0]);
  });

  it("renders the progress slider", () => {
    const progressSlider = getByTestIdFunction("slider");
    expect(progressSlider).toBeInTheDocument();
  });

  it("Plays track on play button click", () => {
    const playButton = getByTestIdFunction("play-button");

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    act(() => fireEvent.click(playButton));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });
});
