import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SectionHeading from '../SectionHeading';

describe('SectionHeading', () => {
  it('renders correctly', () => {
    render(<SectionHeading id="fake-id" title="fake-title" />);

    expect(screen.getByText('fake-title')).toBeInTheDocument();
  });
});
