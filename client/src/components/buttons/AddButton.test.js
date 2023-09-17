import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";

test("AddButton calls onClick handler when clicked", () => {
  const onClickMock = jest.fn();

  const { getByTestId } = render(<AddButton onClick={onClickMock} />);

  const button = getByTestId("add-button");

  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalled();
});
