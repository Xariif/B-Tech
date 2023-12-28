import { useState, useEffect, useContext } from "react";
import { PostManagerContext } from "../../context/PostMenagerContext";

const usePostMenager = () => {
  const context = useContext(PostManagerContext);
  if (!context)
    throw new Error("usePostMenager must be used within a PostManagerProvider");
  return context;
};

export default usePostMenager;
