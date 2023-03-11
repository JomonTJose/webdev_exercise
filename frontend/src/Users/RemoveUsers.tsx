import { useCallback } from "react";
import { deleteUsersBulk } from "../Services/api";

type propTypes = {
  refetch: () => void;
};

export default function RemoveUsers({ refetch }: propTypes): JSX.Element {
  const onClick = useCallback(() => {
    deleteUsersBulk().then(refetch);
  }, [refetch]);
  return <button  onClick={onClick}>Remove Users</button>;
}
