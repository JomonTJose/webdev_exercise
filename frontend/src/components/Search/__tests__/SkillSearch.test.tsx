import { screen, fireEvent, within, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import SkillsSearch from "../SkillsSearch";

const mockProps = {
  skills: [],
  selectedSkills: [],
  handleSkillChange: jest.fn(),
};

describe("SkillSearch_Component", () => {
  it("Component should render correctly", () => {
    render(<SkillsSearch {...mockProps} />);
    expect(screen.getByLabelText("Skills")).toBeInTheDocument();
  });


});
