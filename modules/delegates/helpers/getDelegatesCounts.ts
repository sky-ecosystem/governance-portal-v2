import { AllDelegatesEntryWithName } from '../types';

export default function getDelegatesCounts(allDelegatesWithNames: AllDelegatesEntryWithName[]): {
  alignedDelegatesCount: number;
  shadowDelegatesCount: number;
  totalDelegatesCount: number;
} {
  const rawAlignedDelegates = allDelegatesWithNames.filter(delegate => !delegate.expired && delegate.name);

  const alignedDelegatesCount = new Set(rawAlignedDelegates.map(delegate => delegate.name)).size;
  const shadowDelegatesCount =
    allDelegatesWithNames.filter(delegate => !delegate.expired).length - rawAlignedDelegates.length;
  const totalDelegatesCount = alignedDelegatesCount + shadowDelegatesCount;

  return { alignedDelegatesCount, shadowDelegatesCount, totalDelegatesCount };
}
