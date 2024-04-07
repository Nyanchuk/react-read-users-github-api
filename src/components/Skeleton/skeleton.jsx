import React from "react";
import styles from "./skeleton.module.css";

const MySkeleton = () => {
  const skeletonItems = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className={styles.trackSkeleton}>
      <div className={styles.trackSkeletonRec__cur}></div>
      <div
        className={styles.trackSkeletonRec}
        style={{ width: "80%" }}
      ></div>
      <div
        className={styles.trackSkeletonRec}
        style={{ width: "15%" }}
      ></div>
    </div>
  ));

  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>{skeletonItems}</div>
    </div>
  );
};

export default MySkeleton;
