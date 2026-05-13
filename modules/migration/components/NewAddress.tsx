/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { NewAddressInitial } from 'modules/migration/components/NewAddressInitial';
import { NewAddressSuccess } from 'modules/migration/components/NewAddressSuccess';
import { NewAddressError } from 'modules/migration/components/NewAddressError';

export type NewAddressStatus = 'initial' | 'pending' | 'success' | 'error';

export function NewAddress({
  handleSubmitNewAddress
}: {
  handleSubmitNewAddress: (newAddress: string) => Promise<Response>;
}): JSX.Element {
  const [submissionStatus, setSubmissionStatus] = useState<NewAddressStatus>('initial');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (newAddress: string) => {
    if (!newAddress || newAddress.length !== 42) {
      setError(true);
      return;
    }
    try {
      const req = await handleSubmitNewAddress(newAddress);
      if (req.status === 200) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (err) {
      setSubmissionStatus('error');
    }
  };

  const resetStatus = () => {
    setError(false);
    setSubmissionStatus('initial');
  };

  return (
    <>
      {submissionStatus === 'initial' && (
        <NewAddressInitial handleSubmit={handleSubmit} setError={setError} error={error} />
      )}
      {submissionStatus === 'error' && <NewAddressError resetStatus={resetStatus} />}
      {submissionStatus === 'success' && <NewAddressSuccess />}
    </>
  );
}
