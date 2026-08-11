import type { Meta, StoryObj } from '@storybook/react-vite';
import MovieCard from './MovieCard';
import { MemoryRouter } from 'react-router-dom';


const meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],

} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: '1',
        title: 'Inception',
        poster: 'https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c.jpg?v=1762975399&width=1680',
        year: '2010',
        rating: 8.8,
        isFavourite: false,
        onFavourite: () => { },
    },
};

