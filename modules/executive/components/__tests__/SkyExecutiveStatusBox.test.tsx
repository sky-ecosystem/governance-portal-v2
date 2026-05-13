import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import theme from 'lib/theme';
import SkyExecutiveStatusBox from '../SkyExecutiveStatusBox';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';

import { vi } from 'vitest';

// Mock the getSkyStatusText function
vi.mock('modules/executive/helpers/getStatusText', () => ({
  getSkyStatusText: vi.fn(() => 'Scheduled for execution')
}));

const mockExecutive: SkyExecutiveDetailResponse = {
  title: 'Test Executive',
  proposalBlurb: 'Test proposal blurb',
  key: 'test-executive',
  address: '0x1234567890123456789012345678901234567890',
  date: '2023-01-01T00:00:00Z',
  content: 'Test content',
  active: true,
  proposalLink: 'https://vote.sky.money/executive/test-executive',
  spellData: {
    hasBeenCast: false,
    hasBeenScheduled: true,
    nextCastTime: '2023-01-02T00:00:00Z',
    datePassed: '2023-01-01T12:00:00Z',
    dateExecuted: '',
    skySupport: '1000000',
    executiveHash: '0xabcdef',
    officeHours: 'true'
  }
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SkyExecutiveStatusBox', () => {
  it('renders status text correctly', () => {
    renderWithTheme(<SkyExecutiveStatusBox executive={mockExecutive} />);
    
    expect(screen.getByText('Scheduled for execution')).toBeInTheDocument();
  });

  it('renders with correct test ID', () => {
    renderWithTheme(<SkyExecutiveStatusBox executive={mockExecutive} />);
    
    expect(screen.getByTestId('sky-executive-status')).toBeInTheDocument();
  });

  it('renders with custom skyOnHat value', () => {
    const skyOnHat = BigInt('500000');
    renderWithTheme(<SkyExecutiveStatusBox executive={mockExecutive} skyOnHat={skyOnHat} />);
    
    expect(screen.getByTestId('sky-executive-status')).toBeInTheDocument();
  });

  it('handles different spell data states', () => {
    const castExecutive = {
      ...mockExecutive,
      spellData: {
        ...mockExecutive.spellData,
        hasBeenCast: true,
        hasBeenScheduled: true,
        dateExecuted: '2023-01-02T12:00:00Z'
      }
    };

    renderWithTheme(<SkyExecutiveStatusBox executive={castExecutive} />);
    
    expect(screen.getByTestId('sky-executive-status')).toBeInTheDocument();
  });
});