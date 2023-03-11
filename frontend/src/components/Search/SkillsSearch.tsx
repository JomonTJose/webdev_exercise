import { Autocomplete, TextField, Chip } from "@mui/material";
import { ISkill } from "../../models/types";

type SkillsProp = {
  skills: ISkill[];
  selectedSkills: string[];
  handleSkillChange: (e: any, skills: string[]) => void;
  freeSolo?: boolean;
  error?: string;
};
const SkillsSearch = ({
  skills,
  selectedSkills,
  handleSkillChange,
  freeSolo,
  error,
}: SkillsProp) => {
  return (
    <Autocomplete
      multiple
      id="skills_autocomplete"
      options={skills.map((skill) => skill.name)}
      defaultValue={[...selectedSkills]}
      value={selectedSkills}
      data-testid="skillsSearch"
      freeSolo={freeSolo}
      onChange={(e, skills) => handleSkillChange(e, skills)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Hit Enter to add a new skill; Search Skills"
          autoFocus
          data-testid="skillsText"
          label="Skills"
          error={error !== ""}
        />
      )}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
    />
  );
};

export default SkillsSearch;
