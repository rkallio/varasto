import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  actions,
  payloadCreators,
} from '../../src/modal/modal.redux.js';

jest.mock('react-redux');
import { useDispatch } from 'react-redux';

import * as ModalButtons from '../../src/modal/modal-buttons.jsx';

describe('open modal button', () => {
  it('calls to open modal when clicked', () => {
    const expected = actions.push(payloadCreators.formPicker());
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(<ModalButtons.OpenModalButton />);
    const button = component.getByTestId('open-modal-button');
    userEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});

describe('show item form button', () => {
  it('calls to show item form when clicked', () => {
    const expected = actions.push(payloadCreators.newItem());
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(<ModalButtons.ShowItemFormButton />);
    const button = component.getByTestId('show-item-form-button');
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});

describe('show transient form button', () => {
  it('calls to open transient form when clicked', () => {
    const expected = actions.push(payloadCreators.newTransient());
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(
      <ModalButtons.ShowTransientFormButton />
    );
    const button = component.getByTestId(
      'show-transient-form-button'
    );
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});

describe('close modal button', () => {
  it('calls to close modal when clicked', () => {
    const expected = actions.clear();
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(
      <ModalButtons.CloseModalButton>
        Close
      </ModalButtons.CloseModalButton>
    );
    const button = component.getByText('Close');
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});

describe('pop modal button', () => {
  it('calls to pop current modal when clicked', () => {
    const expected = actions.pop();
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(
      <ModalButtons.PopModalButton>Pop</ModalButtons.PopModalButton>
    );
    const button = component.getByText('Pop');
    userEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
