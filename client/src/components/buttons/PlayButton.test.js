import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PlayButton from "./PlayButton";

test("PlayButton calls onClick handler when clicked", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(<PlayButton onClick={onClickMock} />);

  const button = getByTestId("play-button");

  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalled();
});

test("PlayButton is rendered with play svg", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(
    <PlayButton onClick={onClickMock} isPlaying={false} />,
  );

  const playSvg = getByTestId("play-svg");

  expect(playSvg).toBeInTheDocument();
});

test("PlayButton is rendered with pause svg", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(
    <PlayButton onClick={onClickMock} isPlaying />,
  );

  const pauseSvg = getByTestId("pause-svg");

  expect(pauseSvg).toBeInTheDocument();
});
