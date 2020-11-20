import React from "react";

const styles = {
  image: { margin: "auto", marginBottom: "20px" },
};

export const ProfilePicture = () => {
  return (
    <img
      width={100}
      className="rounded-circle"
      src={"/profile.png"}
      alt=""
      style={styles.image}
    />
  );
};
