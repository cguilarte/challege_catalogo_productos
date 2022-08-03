import { render, screen } from '@testing-library/react';
import Form from '../containers/Products/Form';

test('Render Formulario crear producto', () => {
    render(<Form data={[]} productId={null} typeForm='create' />);
});
