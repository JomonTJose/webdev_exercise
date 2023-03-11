import { useCallback } from "react";
import {addUsersBulk} from "../Services/api";

type propTypes = {
  refetch: () => void;
};

export default function AddUsers({ refetch }: propTypes): JSX.Element{
  const onClick = useCallback(() => {
    addUsersBulk().then(refetch);
  }, [refetch]);
  return <button 
          data-testid="addusers" 
          onClick={onClick}>
          Add Users
        </button>;
}
