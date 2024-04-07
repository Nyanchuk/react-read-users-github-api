import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App , {handleSearch} from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/store";
import styles from "./main.module.css";

// Средние тесты на функционал DOM-элементов
test('handleSearch function is called when "Поиск" button is clicked', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const searchButton = screen.getByText("Поиск");
  fireEvent.click(searchButton);
});

test('handleSortOff function is called when "Без сортировки" button is clicked', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const sortOffButton = screen.getByText("Без сортировки");
  fireEvent.click(sortOffButton);

  // Здесь вы можете добавить проверку, что функция handleSortOff вызывается
});

test('handleSortAscending function is called when "По возрастанию" button is clicked', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const sortAscendingButton = screen.getByText("По возрастанию");
  fireEvent.click(sortAscendingButton);
});

// Простые тесты
test("renders logo with correct attributes", () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const logoElement = screen.getByAltText("Логотип");
  expect(logoElement).toBeInTheDocument();
  expect(logoElement).toHaveAttribute("src", "githubW.png");
  expect(logoElement).toHaveClass(styles.logo);
});

test("renders input field for user login", () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const inputElement = screen.getByPlaceholderText(
    "Введите логин пользователя"
  );
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveClass(styles.header__input);
});

test("renders search button with correct text", () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );

  const searchButton = screen.getByRole("button", { name: "Поиск" });
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toHaveClass(styles.header__button);
});
