import { useState, useEffect, useContext } from "react";
import { PostManagerContext } from "../../context/PostMenagerContext";

const usePostManager = () => {
  const context = useContext(PostManagerContext);
  if (!context)
    throw new Error("usePostManager must be used within a PostManagerProvider");
  return context;
};

export default usePostManager;
