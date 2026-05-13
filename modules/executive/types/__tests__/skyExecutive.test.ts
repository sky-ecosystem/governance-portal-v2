import { isSkyExecutive, isSkySpellData, SkyExecutiveDetailResponse } from '../skyExecutive';

describe('Sky Executive Type Guards', () => {
  describe('isSkyExecutive', () => {
    const validSkyExecutive: SkyExecutiveDetailResponse = {
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

    it('returns true for valid Sky executive', () => {
      expect(isSkyExecutive(validSkyExecutive)).toBe(true);
    });

    it('returns false for null', () => {
      expect(isSkyExecutive(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isSkyExecutive(undefined)).toBe(false);
    });

    it('returns false for non-object', () => {
      expect(isSkyExecutive('string')).toBe(false);
      expect(isSkyExecutive(123)).toBe(false);
      expect(isSkyExecutive(true)).toBe(false);
    });

    it('returns false for object missing key field', () => {
      const invalidExecutive = {
        ...validSkyExecutive,
        key: undefined
      };
      delete (invalidExecutive as any).key;
      
      expect(isSkyExecutive(invalidExecutive)).toBe(false);
    });

    it('returns false for object missing spellData field', () => {
      const invalidExecutive = {
        ...validSkyExecutive,
        spellData: undefined
      };
      delete (invalidExecutive as any).spellData;
      
      expect(isSkyExecutive(invalidExecutive)).toBe(false);
    });

    it('returns false for object with spellData missing skySupport', () => {
      const invalidExecutive = {
        ...validSkyExecutive,
        spellData: {
          ...validSkyExecutive.spellData,
          skySupport: undefined
        }
      };
      delete (invalidExecutive.spellData as any).skySupport;
      
      expect(isSkyExecutive(invalidExecutive)).toBe(false);
    });

    it('returns false for legacy executive (without skySupport)', () => {
      const legacyExecutive = {
        title: 'Legacy Executive',
        address: '0x1234567890123456789012345678901234567890',
        spellData: {
          hasBeenCast: false,
          hasBeenScheduled: true,
          mkrSupport: '1000000' // Legacy executives use mkrSupport instead of skySupport
        }
      };
      
      expect(isSkyExecutive(legacyExecutive)).toBe(false);
    });

    it('returns true for Sky executive with additional fields', () => {
      const executiveWithExtra = {
        ...validSkyExecutive,
        extraField: 'extra',
        supporters: [
          {
            address: '0x1234567890123456789012345678901234567890',
            skySupport: '500000',
            percentage: 50.0
          }
        ]
      };
      
      expect(isSkyExecutive(executiveWithExtra)).toBe(true);
    });
  });

  describe('isSkySpellData', () => {
    const validSkySpellData = {
      hasBeenCast: false,
      hasBeenScheduled: true,
      nextCastTime: '2023-01-02T00:00:00Z',
      datePassed: '2023-01-01T12:00:00Z',
      dateExecuted: '',
      skySupport: '1000000',
      executiveHash: '0xabcdef',
      officeHours: 'true'
    };

    it('returns true for valid Sky spell data', () => {
      expect(isSkySpellData(validSkySpellData)).toBe(true);
    });

    it('returns false for null', () => {
      expect(isSkySpellData(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isSkySpellData(undefined)).toBe(false);
    });

    it('returns false for non-object', () => {
      expect(isSkySpellData('string')).toBe(false);
      expect(isSkySpellData(123)).toBe(false);
      expect(isSkySpellData(true)).toBe(false);
    });

    it('returns false for object missing skySupport field', () => {
      const invalidSpellData = {
        ...validSkySpellData,
        skySupport: undefined
      };
      delete (invalidSpellData as any).skySupport;
      
      expect(isSkySpellData(invalidSpellData)).toBe(false);
    });

    it('returns false for legacy spell data (with mkrSupport)', () => {
      const legacySpellData = {
        hasBeenCast: false,
        hasBeenScheduled: true,
        mkrSupport: '1000000' // Legacy spell data uses mkrSupport
      };
      
      expect(isSkySpellData(legacySpellData)).toBe(false);
    });

    it('returns true for Sky spell data with additional fields', () => {
      const spellDataWithExtra = {
        ...validSkySpellData,
        extraField: 'extra'
      };
      
      expect(isSkySpellData(spellDataWithExtra)).toBe(true);
    });

    it('returns true for minimal Sky spell data', () => {
      const minimalSpellData = {
        skySupport: '1000000'
      };
      
      expect(isSkySpellData(minimalSpellData)).toBe(true);
    });
  });
});