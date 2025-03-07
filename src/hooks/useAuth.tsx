import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "src/features/auth/authSlice";

export const useAuth = () => {
  const userInfo = useSelector(selectCurrentUser);

  return useMemo(() => ({ userInfo }), [userInfo]);
};
