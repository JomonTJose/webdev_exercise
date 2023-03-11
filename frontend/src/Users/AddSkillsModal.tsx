import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SkillsSearch from "../components/Search/SkillsSearch";
import { ISkill, IUser } from "../models/types";
import { addSkills, fetchSkills } from "../Services/api";

type SkillsModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  user: IUser | null;
};

const AddSkillsModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: SkillsModalProps) => {

  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [error, setError]= useState<string>("");

  useEffect(() => {
    if(user){
        setSelectedSkills([...user.skills])
    }
  }, [user]);
  
  const handleChange = (e: any, skills: string[]) => {
    setSelectedSkills([...skills]);
  };
  const loadSkills = useCallback(() => {
    fetchSkills().then(setSkills);
  }, []);
  useEffect(loadSkills, [loadSkills]);

  const saveSkills =async ()=>{
    try{
        if(selectedSkills.length){
            const skills = await addSkills(selectedSkills,user!.id);
            onSubmit();
            onClose();
        }else{
            setError("Please add atleast one skill")
        }   
    }
    catch{
      setError("Error adding skill")
    }
  
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth data-testid="AddSkillModal">
      <DialogTitle title="Add New Skill" />
      <DialogContent>
        <form onSubmit={saveSkills}>
          <SkillsSearch
            selectedSkills={[...selectedSkills]}
            skills={skills}
            handleSkillChange={handleChange}
            freeSolo
            error={error}
          />
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={saveSkills}>Add</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillsModal;
