import Loader from "react-loaders";
import Loadingoverlay from "react-loading-overlay";
import React from "react";

interface LoadingInterface {
  loading: boolean;
  children: React.ReactElement<any>;
}
export const LoadingOverlay = ({ loading, children }: LoadingInterface) => {
  return (
    <Loadingoverlay
      tag="div"
      active={loading}
      styles={{
        overlay: (base: any) => ({
          ...base,
          background: "#fff",
          opacity: 0.5,
        }),
      }}
      spinner={<Loader active type="ball-triangle-path" />}
    >
      {children}
    </Loadingoverlay>
  );
};
