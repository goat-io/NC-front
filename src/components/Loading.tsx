import Loader from "react-loaders";
import React from "react";

export const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader-container-inner">
        <div className="text-center">
          <Loader type="ball-triangle-path" active={true} />
        </div>
        <h6 className="mt-5">
          Loading the app!!!!
          <small>Give us a few seconds to set things up!</small>
        </h6>
      </div>
    </div>
  );
};
