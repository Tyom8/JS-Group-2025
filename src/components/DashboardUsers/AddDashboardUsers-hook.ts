import { useCallback, useEffect, useState } from "react";
import {
  deleteUser,
  getUsers,
} from "../../store/dashboardUsers/dashboardUsersActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IAddUser } from "../../types";

export const useAddDashboardUsers = () => {
  // state to show user form
  const [isAddUserFormShown, setIsAddUserFormShown] = useState<boolean>(false);
  const addedUsers = useAppSelector((state) => state.dashboardUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = () => {
      const storedUsers = localStorage.getItem("dashboardUsers");
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        dispatch(getUsers(parsedUsers));
      }
    };

    getData();
  }, []);

  // function that handles user adding
  const handleAddUsers = useCallback(
    (data: IAddUser) => {
      data.id = Date.now();
      const updated = [...addedUsers, data];
      dispatch(getUsers(updated));
      localStorage.setItem("dashboardUsers", JSON.stringify(updated));
      setIsAddUserFormShown(false);
    },
    [dispatch, addedUsers]
  );

  // function that handles user deleting
  const handleDeleteUsers = useCallback(
    (id: number) => {
      dispatch(deleteUser(id));
    },
    [dispatch]
  );

  return {
    addedUsers,
    isAddUserFormShown,
    setIsAddUserFormShown,
    handleAddUsers,
    handleDeleteUsers,
  };
};
