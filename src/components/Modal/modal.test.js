import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./modal";

test("should render modal component", () => {
  const { getByText } = render(<Modal closeModal={() => {}} errorText="Error message" />);
  expect(getByText("Error message")).toBeInTheDocument();
});

test("should close modal when clicking on close button", () => {
    const closeModalMock = jest.fn();
    const { getByText } = render(<Modal closeModal={closeModalMock} errorText="Error message" />);
    fireEvent.click(getByText("×"));
    expect(closeModalMock).toHaveBeenCalled();
  });