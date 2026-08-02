import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Experience from '../Experience';

describe('Experience', () => {
  it('renders the section orchestration and cards content correctly', () => {
    render(<Experience />);

    expect(screen.getByRole('heading', { level: 2, name: 'experience.title' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'ripio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'we accelerate' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 4, name: 'experience.mainAreas' })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { level: 4, name: 'experience.technologies' })).toHaveLength(2);

    expect(screen.getByText('experience.ripio.companyType')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.description')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.period')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.role')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.trading')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.backoffice')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.designSystem')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.testing')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.internationalization')).toBeInTheDocument();
    expect(screen.getByText('experience.ripio.area.performance')).toBeInTheDocument();

    expect(screen.getByText('experience.weAccelerate.companyType')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.description')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.period')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.role')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.area.backend')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.area.mobile')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.area.realtime')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.area.web')).toBeInTheDocument();
    expect(screen.getByText('experience.weAccelerate.area.integrations')).toBeInTheDocument();

    expect(screen.getAllByText('React')).toHaveLength(2);
    expect(screen.getAllByText('TypeScript')).toHaveLength(2);
    expect(screen.getByText('Styled Components')).toBeInTheDocument();
    expect(screen.getByText('TanStack Query')).toBeInTheDocument();
    expect(screen.getByText('Storybook')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('React Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Playwright')).toBeInTheDocument();
    expect(screen.getByText('TradingView')).toBeInTheDocument();
    expect(screen.getByText('LaunchDarkly')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Mongoose')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
    expect(screen.getByText('Swagger')).toBeInTheDocument();
  });
});
