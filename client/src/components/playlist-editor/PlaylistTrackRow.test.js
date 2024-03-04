import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PlaylistTrackRow from "./PlaylistTrackRow";

describe("PlaylistTrackRow", () => {
  describe("render", () => {
    const TEST_TRACK = {
      id: "kro43exp2T",
      title: "Expectations",
      length: 137,
      bpm: 120,
      genres: ["Beats"],
      moods: ["Happy", "Restless"],
      main_artists: ["Dylan Sitts", "Megan Wofford"],
      featured_artists: [],
    };

    test("show Track info", () => {
      const trackDuration = "02:17";
      const mainArtists = "Dylan Sitts, Megan Wofford";

      render(<PlaylistTrackRow track={TEST_TRACK} />);

      expect(screen.getByText("Expectations")).toBeInTheDocument();
      expect(screen.getByText(trackDuration)).toBeInTheDocument();
      expect(screen.getByText(mainArtists)).toBeInTheDocument();
    });

    test("does not crash if Track is undefined", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} />);
    });
  });

  describe("addTrack", () => {
    const TEST_TRACK = {
      title: "test",
      main_artists: ["single_artist"],
      length: 63,
    };
    const addTrackMock = jest.fn();

    test("displays add button when addTrack is set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} addTrack={addTrackMock} />);

      // Check that the + button is displayed
      const addButton = screen.getByText("+");
      expect(addButton).toBeInTheDocument();

      // Simulate a click
      fireEvent.click(addButton);

      // Verify that the mock function was called
      expect(addTrackMock).toHaveBeenCalled();
    });

    test("does not display add button when addTrack is not set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} />);
      expect(screen.queryByText("+")).toBeNull();
    });
  });

  describe("removeTrack", () => {
    const TEST_TRACK = {
      title: "test",
      main_artists: ["single_artist"],
      length: 63,
    };
    const removeTrackMock = jest.fn();

    test("displays remove button when removeTrack is set", () => {
      render(
        <PlaylistTrackRow track={TEST_TRACK} removeTrack={removeTrackMock} />,
      );

      // Check that the - button is displayed
      const removeButton = screen.getByText("-");
      expect(removeButton).toBeInTheDocument();

      // Simulate a click
      fireEvent.click(removeButton);

      // Verify that the mock function was called
      expect(removeTrackMock).toHaveBeenCalled();
    });

    test("does not display remove button when removeTrack is not set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} />);
      expect(screen.queryByText("-")).toBeNull();
    });
  });

  describe("reorder track", () => {
    const TEST_TRACK = {
      title: "test",
      main_artists: ["single_artist"],
      length: 63,
    };
    const moveUpMock = jest.fn();
    const moveDownMock = jest.fn();

    test("displays move up button when moveUp is set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} moveUp={moveUpMock} />);

      // Check that the ^ button is displayed
      const moveUpButton = screen.getByText("^");
      expect(moveUpButton).toBeInTheDocument();

      // Simulate a click
      fireEvent.click(moveUpButton);

      // Verify that the mock function was called
      expect(moveUpMock).toHaveBeenCalled();
    });

    test("does not display move up button when moveUp is not set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} />);
      expect(screen.queryByText("^")).toBeNull();
    });

    test("displays move down button when moveDown is set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} moveDown={moveDownMock} />);

      // Check that the move down button is displayed
      const moveDownButton = screen.getByText("v");
      expect(moveDownButton).toBeInTheDocument();

      // Simulate a click
      fireEvent.click(moveDownButton);

      // Verify that the mock function was called
      expect(moveDownMock).toHaveBeenCalled();
    });

    test("does not display move up button when moveDown is not set", () => {
      render(<PlaylistTrackRow track={TEST_TRACK} />);
      expect(screen.queryByText("v")).toBeNull();
    });
  });
});
