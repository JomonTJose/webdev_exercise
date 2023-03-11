import AddSkillsModal from "../AddSkillsModal";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

const mockSkillsModalProps = {
  open: true,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  user: null
};

describe('AddSkillModal Component', () => {
    it("Should render when open props is true ", ()=>{
        render(
            <AddSkillsModal 
               {...mockSkillsModalProps}
            />
        )
        expect(screen.getByLabelText("Skills")).toBeInTheDocument();
    })
 })