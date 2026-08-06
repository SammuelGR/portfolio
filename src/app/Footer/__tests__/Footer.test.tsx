import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '../Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer />);

    expect(screen.getByText('footer.content')).toBeInTheDocument();
  });
});
