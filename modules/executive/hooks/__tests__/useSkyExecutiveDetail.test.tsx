import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { useSkyExecutiveDetail } from '../useSkyExecutiveDetail';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';
import { vi } from 'vitest';

// Mock fetchJson
vi.mock('lib/fetchJson', () => ({
  fetchJson: vi.fn()
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
  },
  supporters: [
    {
      address: '0x1234567890123456789012345678901234567890',
      skySupport: '500000',
      percentage: 50.0
    }
  ]
};

const createWrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
    {children}
  </SWRConfig>
);

describe('useSkyExecutiveDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns undefined when no proposalIdOrKey is provided', () => {
    const { result } = renderHook(() => useSkyExecutiveDetail(undefined), {
      wrapper: createWrapper
    });

    expect(result.current.executive).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isValidating).toBe(false);
  });

  it('fetches executive data when proposalIdOrKey is provided', async () => {
    const { fetchJson } = await import('lib/fetchJson');
    vi.mocked(fetchJson).mockResolvedValueOnce(mockExecutive);

    const { result } = renderHook(() => useSkyExecutiveDetail('test-executive'), {
      wrapper: createWrapper
    });

    await waitFor(() => {
      expect(result.current.executive).toEqual(mockExecutive);
    });

    expect(vi.mocked(fetchJson)).toHaveBeenCalledWith('/api/sky/executives/test-executive');
    expect(result.current.error).toBeUndefined();
    expect(result.current.isValidating).toBe(false);
  });

  it('handles API errors correctly', async () => {
    const { fetchJson } = await import('lib/fetchJson');
    const error = new Error('API Error');
    vi.mocked(fetchJson).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSkyExecutiveDetail('test-executive'), {
      wrapper: createWrapper
    });

    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });

    expect(result.current.executive).toBeUndefined();
    expect(result.current.isValidating).toBe(false);
  });

  it('uses custom refresh interval', async () => {
    const { fetchJson } = await import('lib/fetchJson');
    vi.mocked(fetchJson).mockResolvedValueOnce(mockExecutive);

    const { result } = renderHook(() => useSkyExecutiveDetail('test-executive', 30000), {
      wrapper: createWrapper
    });

    await waitFor(() => {
      expect(result.current.executive).toEqual(mockExecutive);
    });

    expect(vi.mocked(fetchJson)).toHaveBeenCalledWith('/api/sky/executives/test-executive');
  });

  it('provides mutate function', async () => {
    const { fetchJson } = await import('lib/fetchJson');
    vi.mocked(fetchJson).mockResolvedValueOnce(mockExecutive);

    const { result } = renderHook(() => useSkyExecutiveDetail('test-executive'), {
      wrapper: createWrapper
    });

    await waitFor(() => {
      expect(result.current.executive).toEqual(mockExecutive);
    });

    expect(typeof result.current.mutate).toBe('function');
  });

  it('handles empty string proposalIdOrKey', () => {
    const { result } = renderHook(() => useSkyExecutiveDetail(''), {
      wrapper: createWrapper
    });

    expect(result.current.executive).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isValidating).toBe(false);
  });

  it('handles different proposalIdOrKey formats', async () => {
    const { fetchJson } = await import('lib/fetchJson');
    vi.mocked(fetchJson).mockResolvedValueOnce(mockExecutive);

    const { result } = renderHook(() => useSkyExecutiveDetail('exec-123'), {
      wrapper: createWrapper
    });

    await waitFor(() => {
      expect(result.current.executive).toEqual(mockExecutive);
    });

    expect(vi.mocked(fetchJson)).toHaveBeenCalledWith('/api/sky/executives/exec-123');
  });
});