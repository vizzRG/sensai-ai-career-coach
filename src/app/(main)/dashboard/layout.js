import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl  ">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
            Industry Insights
          </span>
        </h1>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
