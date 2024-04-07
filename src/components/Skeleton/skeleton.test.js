import MySkeleton from "./skeleton";
import { render } from "@testing-library/react";
import styles from "./skeleton.module.css";

test("should render 20 skeleton items", () => {
  const { container } = render(<MySkeleton />);
  const skeletonItems = container.querySelectorAll(".trackSkeleton");
  expect(skeletonItems.length).toBe(20);
});

test("should be wrapped in a playlist item container", () => {
  const { container } = render(<MySkeleton />);
  expect(container.querySelector(`.${styles.playlistItem}`)).toBeTruthy();
});

