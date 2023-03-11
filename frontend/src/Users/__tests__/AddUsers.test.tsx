import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUsers from '../AddUsers';
import '@testing-library/jest-dom';

const mockProps= {
    refetch: jest.fn()
}

describe("Add Users with Skills", ()=>{
    it("should render component correctly", ()=>{
        render(
            <AddUsers {...mockProps} />
        )
        expect(screen.getByTestId("addusers")).toBeInTheDocument();
    })

    it("should fire button click event", async ()=>{
        render(
            <AddUsers refetch={mockProps.refetch} />
        )
        const buttonControl= screen.getByTestId("addusers");
        fireEvent.click(buttonControl);
        await waitFor(() => {
            expect(mockProps.refetch).toHaveBeenCalled();
          });
    })
})