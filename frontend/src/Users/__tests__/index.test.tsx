import Users from "../index";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import {IUser} from "../../models/types"
import UsersList from "../UsersList";
describe("Users Component", ()=>{

    it("Should render the component correctly", ()=>{
        render(<Users />)
        expect(screen.getByTestId("UsersComponent")).toBeInTheDocument();
    })

    it("Should render Skills AutoComplete textbox", ()=>{
        render(<Users />)
        expect(screen.getByTestId("skillsSearch")).toBeInTheDocument();
    })

    it("Should display Users List Component", ()=>{
       const  users: IUser[]=[{
            id:1,
            name:"Michael",
            skills: []
        },
        {
            id:2,
            name:"Gabriel",
            skills: []
        }];
        render(
          <UsersList
            users={users}
            onAddSkill={() => {}}
            onSkillClick={() => {}}
          />
        );

        expect(screen.getByText("Michael")).toBeInTheDocument();
        
    })

    it("Should open add skils modal when clikcing on add skill button", ()=>{
        const  users: IUser[]=[{
             id:1,
             name:"Michael",
             skills: []
         },
         {
             id:2,
             name:"Gabriel",
             skills: []
         }];
         render(
           <UsersList
             users={users}
             onAddSkill={() => {}}
             onSkillClick={() => {}}
           />
         );
 
         expect(screen.getByTestId("add-skll-button")).toBeInTheDocument();
         
     })
})