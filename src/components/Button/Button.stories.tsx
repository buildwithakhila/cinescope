import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Watch Now',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        label: 'More Info',
        variant: 'secondary',
    },
};

export const Disabled: Story = {
    args: {
        label: 'More Info',
        variant: 'primary',
        disabled: true,
    },
};