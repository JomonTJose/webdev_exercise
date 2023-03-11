import { useCallback, useEffect, useState } from "react";
import AddUsers from "./AddUsers";
import RemoveUsers from "./RemoveUsers";
import "./Users.css";
import { IUser, ISkill } from "../models/types";
import { fetchSkills, fetchUsers } from "../Services/api";
import UsersList from "./UsersList";
import SkillsSearch from "../components/Search/SkillsSearch";
import AddSkillsModal from "./AddSkillsModal";

const UsersActions = ({ children }: any) => (
  <div className="users-actions">{children}</div>
);

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [openAddSkillsModal, setOpenAddSkillsDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const loadUsers = useCallback(() => {
    fetchUsers(selectedSkills).then(setUsers);
  }, [selectedSkills]);
  useEffect(loadUsers, [loadUsers]);

  const loadSkills = useCallback(() => {
    fetchSkills().then(setSkills);
  }, []);
  useEffect(loadSkills, [loadSkills]);

  const handleSkillChange = (skill: string[]) => {
    setSelectedSkills(skill);
    loadUsers();
  };

  const onAddSkill = (user: IUser) => {
    setSelectedUser(user);
    setOpenAddSkillsDialog(true);
  };

  const closeAddSkillsModal = () => {
    setSelectedUser(null);
    setOpenAddSkillsDialog(false);
  };

  const addNewSkill = () => {
    loadSkills();
    loadUsers();
  };

  return (
    <div data-testid="UsersComponent">
      <UsersActions data-testid="UserActions">
        <AddUsers refetch={loadUsers} />
        <RemoveUsers refetch={loadUsers} />
      </UsersActions>

      <SkillsSearch
        handleSkillChange={(e, skills) => handleSkillChange(skills)}
        selectedSkills={selectedSkills}
        skills={skills}
      />
        <UsersList
          data-testid="users-list"
          users={users}
          onAddSkill={onAddSkill}
          onSkillClick={(skill) => {
            handleSkillChange([...selectedSkills, ...skill]);
          }}
        />
      {openAddSkillsModal && (
        <AddSkillsModal
          open={openAddSkillsModal}
          user={selectedUser}
          onClose={closeAddSkillsModal}
          onSubmit={addNewSkill}
        />
      )}
    </div>
  );
}
