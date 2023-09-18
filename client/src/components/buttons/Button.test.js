import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./Button";

test("Button calls onClick handler when clicked", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(<Button onClick={onClickMock} />);

  const button = getByTestId("button");

  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalled();
});

test("Button is rendered with button type by default", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(<Button onClick={onClickMock} />);

  const button = getByTestId("button");

  expect(button.getAttribute("type")).toBe("button");
});

[BUTTON_TYPES.submit, BUTTON_TYPES.button].forEach((type) => {
  test(`Button has type "${type}"`, () => {
    const { getByTestId } = render(<Button type={type} />);

    const button = getByTestId("button");

    expect(button.getAttribute("type")).toBe(type);
  });
});

[BUTTON_TYPES.delete, "random type"].forEach((type) => {
  test(`Button is rendered with "button" type when type prop is "${type}"`, () => {
    const { getByTestId } = render(<Button type={type} />);

    const button = getByTestId("button");

    expect(button.getAttribute("type")).toBe(BUTTON_TYPES.button);
  });
});
