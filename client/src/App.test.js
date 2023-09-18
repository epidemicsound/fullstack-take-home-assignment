import { render, screen } from "@testing-library/react";
import App from "./App";
import PlayProvider from "./context/PlayContext";
import React from "react";

test("renders app with tracks tab", () => {
  render(
    <PlayProvider>
      <App />
    </PlayProvider>,
  );
  const linkElement = screen.getByText(/tracks/i);
  expect(linkElement).toBeInTheDocument();
});
