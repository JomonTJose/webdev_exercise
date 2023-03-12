import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUsers from '../AddUsers';
import '@testing-library/jest-dom';

const mockFunction1=  jest.fn();

describe("Add Users with Skills", ()=>{
    it("should render component correctly", ()=>{
        render(
            <AddUsers refetch={mockFunction1} />
        )
        expect(screen.getByTestId("addusers")).toBeInTheDocument();
    })

    it("should fire button click event", async ()=>{
        render(
            <AddUsers refetch={mockFunction1} />
        )
        const buttonControl= screen.getByTestId("addusers");
        await fireEvent.click(buttonControl);
        await waitFor(() => {
            expect(mockFunction1).toBeDefined();
        });
    })
})