import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RemoveUsers from '../RemoveUsers';
import '@testing-library/jest-dom';

const mockProps= {
    refetch: jest.fn()
}
const mockFunction =  jest.fn()

describe("Remove Users", ()=>{
    it("should render component correctly", ()=>{
        render(
            <RemoveUsers refetch={mockFunction} />
        )
        expect(screen.getByTestId("removeusers")).toBeInTheDocument();
    })

    it("should fire button click event", async ()=>{
        render(
            <RemoveUsers refetch={mockFunction} />
        )
        const buttonControl= screen.getByTestId("removeusers");
        fireEvent.click(buttonControl);
        await waitFor(() => {
            expect(mockProps.refetch).toBeDefined();
          });
    })
})
