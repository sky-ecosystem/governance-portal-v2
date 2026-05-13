/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { parseEther } from 'viem';
import { MKRInput, MKRInputProps } from '../MKRInput';
import { vi } from 'vitest';

function renderMKRInput(props: Partial<MKRInputProps> = {}) {
  const defaultProps: MKRInputProps = {
    onChange: vi.fn(),
    value: parseEther('0')
  };

  return render(<MKRInput {...defaultProps} {...props} />);
}

describe('MKRInput', () => {
  afterEach(cleanup);

  test('Should reflect the text passed as balanceText', async () => {
    const props: Partial<MKRInputProps> = {
      balanceText: 'Hey'
    };

    renderMKRInput(props);

    const component = screen.getByTestId('mkr-input-balance-text');

    expect(component).toHaveTextContent('Hey');
  });

  test('Should reflect the balance of MKR', async () => {
    const props: Partial<MKRInputProps> = {
      balance: parseEther('24.5')
    };

    renderMKRInput(props);

    const component = screen.getByTestId('mkr-input-balance');

    expect(component).toHaveTextContent('24.5');
    expect(component).not.toHaveTextContent('0.0000');
  });

  test('Should set balance to max when clicking setMax', async () => {
    const props: Partial<MKRInputProps> = {
      balance: parseEther('24.5'),
      value: parseEther('0.1'),
      onChange: vi.fn()
    };

    renderMKRInput(props);
    const setMaxButton = screen.getByTestId('mkr-input-set-max');
    const input = screen.getByTestId('mkr-input');

    userEvent.click(setMaxButton);

    expect(props.onChange).toHaveBeenCalledWith(parseEther('24.5'));

    expect(input).toHaveValue(24.5);
  });

  test('Should trigger on change if the user inputs amount', async () => {
    const props: Partial<MKRInputProps> = {
      balance: parseEther('24.5'),
      value: parseEther('0'),
      onChange: vi.fn()
    };

    renderMKRInput(props);
    const input = screen.getByTestId('mkr-input');
    userEvent.type(input, '3');
    const expectedValue = parseEther('3');
    expect(props.onChange).toHaveBeenCalledWith(expectedValue);
    expect(input).toHaveValue(3);
  });

  test('Should show error if default value is negative amount', async () => {
    const props: Partial<MKRInputProps> = {
      balance: parseEther('24.5'),
      value: parseEther('-0.1'),
      onChange: vi.fn()
    };

    renderMKRInput(props);
    const error = screen.getByTestId('mkr-input-error');

    expect(error).toBeVisible();
    expect(error).toHaveTextContent('Please enter a valid amount');
  });

  test('Should show error if value is greater than balance', async () => {
    const props: Partial<MKRInputProps> = {
      balance: parseEther('24.5'),
      value: parseEther('34'),
      onChange: vi.fn()
    };

    renderMKRInput(props);
    const error = screen.getByTestId('mkr-input-error');

    expect(error).toBeVisible();
    expect(error).toHaveTextContent('MKR balance too low');
  });
});
