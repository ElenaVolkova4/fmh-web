import { IUserInfo } from "src/services/api/authApi";
import { useGetUsersQuery } from "src/services/api/usersApi";

export const useGetUserByIdFromCache = (id: number): IUserInfo | undefined => {
  const { executor } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      executor: data?.find((p) => p.id === id),
    }),
  });

  return executor;
};
