import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { actions } from '../../src/modal/modal.redux.js';

jest.mock('react-redux');
import { useDispatch } from 'react-redux';

import AddButton from '../../src/components/add-button.jsx';

it('calls dispatch with formPicker action', () => {
  const expected = actions.formPicker();
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);

  const component = render(<AddButton />);
  const button = component.getByTestId('add-button');
  userEvent.click(button);

  expect(dispatch).toHaveBeenCalledWith(expected);
});
