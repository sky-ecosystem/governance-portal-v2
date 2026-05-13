import { daiConfig, iouConfig, iouOldConfig, mkrConfig } from 'modules/contracts/generated';
import { TokenName } from '../types/tokens';

export const tokenNameToConfig = (token: TokenName) => {
  if (token === 'dai') return daiConfig;
  else if (token === 'iou') return iouConfig;
  else if (token === 'iouOld') return iouOldConfig;
  else if (token === 'mkr') return mkrConfig;
};
