import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import theme from 'lib/theme';
import SkyExecutiveSupportersBreakdown from '../SkyExecutiveSupportersBreakdown';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';

// Mock the AddressIconBox component
jest.mock('modules/address/components/AddressIconBox', () => {
  return function MockAddressIconBox({ address }: { address: string }) {
    return <div data-testid="address-icon-box">{address.slice(0, 6)}...</div>;
  };
});

// Mock the InternalLink component
jest.mock('modules/app/components/InternalLink', () => {
  return function MockInternalLink({ 
    children, 
    href 
  }: { 
    children: React.ReactNode; 
    href: string; 
  }) {
    return <a href={href} data-testid="internal-link">{children}</a>;
  };
});

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
  },
  supporters: [
    {
      address: '0x1234567890123456789012345678901234567890',
      skySupport: '500000',
      percentage: 50.0
    },
    {
      address: '0x2345678901234567890123456789012345678901',
      skySupport: '300000',
      percentage: 30.0
    },
    {
      address: '0x3456789012345678901234567890123456789012',
      skySupport: '200000',
      percentage: 20.0
    }
  ]
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SkyExecutiveSupportersBreakdown', () => {
  it('renders supporters table correctly', () => {
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    expect(screen.getByText('Supporters')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('SKY Support')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
  });

  it('displays supporter information correctly', () => {
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    // Check that supporter addresses are displayed
    expect(screen.getAllByTestId('address-icon-box')).toHaveLength(3);
    
    // Check SKY amounts
    expect(screen.getByText('500,000 SKY')).toBeInTheDocument();
    expect(screen.getByText('300,000 SKY')).toBeInTheDocument();
    expect(screen.getByText('200,000 SKY')).toBeInTheDocument();
    
    // Check percentages
    expect(screen.getByText('50.00%')).toBeInTheDocument();
    expect(screen.getByText('30.00%')).toBeInTheDocument();
    expect(screen.getByText('20.00%')).toBeInTheDocument();
  });

  it('handles sorting by SKY support', async () => {
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    const skyButton = screen.getByRole('button', { name: /SKY Support/ });
    fireEvent.click(skyButton);

    await waitFor(() => {
      // Should still display the same data, just potentially reordered
      expect(screen.getByText('500,000 SKY')).toBeInTheDocument();
    });
  });

  it('handles sorting by percentage', async () => {
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    const percentageButton = screen.getByRole('button', { name: /Percentage/ });
    fireEvent.click(percentageButton);

    await waitFor(() => {
      expect(screen.getByText('50.00%')).toBeInTheDocument();
    });
  });

  it('displays summary stats correctly', () => {
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    expect(screen.getByText('Total SKY Support')).toBeInTheDocument();
    expect(screen.getByText('1,000,000 SKY')).toBeInTheDocument();
    expect(screen.getByText('Total Supporters')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles empty supporters list', () => {
    const emptyExecutive = {
      ...mockExecutive,
      supporters: []
    };
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={emptyExecutive}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    expect(screen.getByText('Currently there are no supporters')).toBeInTheDocument();
  });

  it('handles missing supporters data', () => {
    const executiveWithoutSupporters = {
      ...mockExecutive,
      supporters: undefined
    };
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={executiveWithoutSupporters}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    // Should show loading spinner when supporters is undefined
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('calls onShowAll when show all button is clicked', () => {
    // Create executive with many supporters to show the button
    const executiveWithManySupporters = {
      ...mockExecutive,
      supporters: Array.from({ length: 15 }, (_, i) => ({
        address: `0x${i.toString().padStart(40, '0')}`,
        skySupport: '10000',
        percentage: 1.0
      }))
    };
    
    const mockOnShowAll = jest.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={executiveWithManySupporters}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    const showAllButton = screen.getByRole('button', { name: /Show all 15 supporters/ });
    fireEvent.click(showAllButton);

    expect(mockOnShowAll).toHaveBeenCalledTimes(1);
  });
});