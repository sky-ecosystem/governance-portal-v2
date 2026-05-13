import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import theme from 'lib/theme';
import SkyExecutiveSupportersBreakdown from '../SkyExecutiveSupportersBreakdown';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';
import { vi } from 'vitest';

// Mock the AddressIconBox component
vi.mock('modules/address/components/AddressIconBox', () => {
  return {
    default: function MockAddressIconBox({ address }: { address: string }) {
      return <div data-testid="address-icon-box">{address.slice(0, 6)}...</div>;
    }
  };
});

// Mock the InternalLink component
vi.mock('modules/app/components/InternalLink', () => {
  return {
    InternalLink: function MockInternalLink({ 
      children, 
      href 
    }: { 
      children: React.ReactNode; 
      href: string; 
    }) {
      return <a href={href} data-testid="internal-link">{children}</a>;
    }
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

const mockSupporters = [
  {
    address: '0x1234567890123456789012345678901234567890',
    deposits: '500000',
    percent: '50.00'
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    deposits: '300000',
    percent: '30.00'
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    deposits: '200000',
    percent: '20.00'
  }
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SkyExecutiveSupportersBreakdown', () => {
  it('renders supporters table correctly', () => {
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={mockSupporters}
        loading={false}
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
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={mockSupporters}
        loading={false}
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
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={mockSupporters}
        loading={false}
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
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={mockSupporters}
        loading={false}
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
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={mockSupporters}
        loading={false}
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
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={[]}
        loading={false}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    expect(screen.getByText('Currently there are no supporters')).toBeInTheDocument();
  });

  it('handles missing supporters data', () => {
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={[]}
        loading={true}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    // Should show loading spinner when loading is true
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('calls onShowAll when show all button is clicked', () => {
    // Create many supporters to show the button
    const manySupporters = Array.from({ length: 15 }, (_, i) => ({
      address: `0x${i.toString().padStart(40, '0')}`,
      deposits: '10000',
      percent: '1.00'
    }));
    
    const mockOnShowAll = vi.fn();
    
    renderWithTheme(
      <SkyExecutiveSupportersBreakdown
        executive={mockExecutive}
        supporters={manySupporters}
        loading={false}
        showAll={false}
        onShowAll={mockOnShowAll}
      />
    );

    const showAllButton = screen.getByRole('button', { name: /Show all 15 supporters/ });
    fireEvent.click(showAllButton);

    expect(mockOnShowAll).toHaveBeenCalledTimes(1);
  });
});