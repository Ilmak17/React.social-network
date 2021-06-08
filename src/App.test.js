import {render, screen} from '@testing-library/react';
import AppJS from "./App";

test('renders learn react link', () => {
    render(<AppJS/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
