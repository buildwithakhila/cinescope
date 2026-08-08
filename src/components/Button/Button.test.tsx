import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';


describe('Button', () => {
    it('shows the label', () => {
        render(<Button label='Watch Now' variant='primary' onClick={vi.fn()} />)
        expect(screen.getByText('Watch Now')).toBeInTheDocument();
    })

    it('onclick of button', async () => {
        const onClick = vi.fn()
        render(<Button label='Watch Now' variant='primary' onClick={onClick} />)
        const user = userEvent.setup()
        const button = screen.getByRole('button', {
            name: 'Watch Now',
        });
        await user.click(button)
        expect(onClick).toHaveBeenCalled;
    })

    it('onclick of disabled button', async () => {
        const onClick = vi.fn()
        render(<Button label='Watch Now' variant='primary' onClick={onClick} disabled={true} />)
        const user = userEvent.setup()
        const button = screen.getByRole('button', {
            name: 'Watch Now',
        });
        await user.click(button)
        expect(onClick).not.toHaveBeenCalled;
    })

})