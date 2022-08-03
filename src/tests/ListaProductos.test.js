import { render, screen } from '@testing-library/react';
import Products from '../containers/Products';

test('Render lista de productos', () => {
    render(<Products />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Catálogo de productos/);
    expect(screen.getByRole("button", { name: "Crear nuevo producto" })).toBeInTheDocument();
});
