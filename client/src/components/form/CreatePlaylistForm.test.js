import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CreatePlaylistForm from "./CreatePlaylistForm";

jest.mock("../../hooks/usePlaylists", () => ({
  __esModule: true,
  default: () => ({
    createPlaylist: jest.fn((data) => Promise.resolve(data)), // Mock createPlaylist function
  }),
}));

describe("CreatePlaylistForm", () => {
  it("renders the form and handles submission", async () => {
    const onFinishMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <CreatePlaylistForm onFinish={onFinishMock} />,
    );

    const titleInput = getByLabelText("Playlist Title");
    fireEvent.change(titleInput, { target: { value: "New Playlist" } });

    fireEvent.click(getByText("Create"));

    await waitFor(() => {
      expect(onFinishMock).toHaveBeenCalledWith({ title: "New Playlist" });
    });
  });

  it("handles cancellation", () => {
    const onFinishMock = jest.fn();
    const { getByText } = render(
      <CreatePlaylistForm onFinish={onFinishMock} />,
    );

    fireEvent.click(getByText("Cancel"));

    expect(onFinishMock).toHaveBeenCalled();
  });
});
