import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import * as Forms from '../../src/components/form-components.jsx';

describe('label', () => {
  it('displays children', () => {
    const expected = 'expected';

    const component = render(<Forms.Label>{expected}</Forms.Label>);

    expect(component.container).toHaveTextContent(expected);
  });

  it('appends * to children when required prop is truthy', () => {
    const passed = 'expected';
    const expected = passed + '*';

    const component = render(
      <Forms.Label required>{passed}</Forms.Label>
    );

    expect(component.container).toHaveTextContent(expected);
  });
});

describe('labeled input', () => {
  it('draws label', () => {
    const expected = 'expected';

    const component = render(
      <Forms.LabeledInput label={expected} name="" />
    );

    expect(component.container).toHaveTextContent(expected);
  });

  it('draws an input element', () => {
    const component = render(<Forms.LabeledInput label="" name="" />);

    expect(component.getByTestId('input')).toBeTruthy();
  });

  it('sets for of label', () => {
    const label = 'label';
    const expected = 'target-input';
    const component = render(
      <Forms.LabeledInput label={label} name={expected} />
    );

    expect(component.getByText(label)).toHaveAttribute(
      'for',
      expected
    );
  });

  it('sets name of input', () => {
    const expected = 'input-name';
    const component = render(
      <Forms.LabeledInput label="" name={expected} />
    );

    expect(component.getByTestId('input')).toHaveAttribute(
      'name',
      expected
    );
  });
});

describe('labeled select', () => {
  it('draws label', () => {
    const expected = 'expected';

    const component = render(
      <Forms.LabeledSelect label={expected} name="">
        {[]}
      </Forms.LabeledSelect>
    );

    expect(component.container).toHaveTextContent(expected);
  });

  it('draws a select element', () => {
    const component = render(
      <Forms.LabeledSelect label="" name="">
        {[]}
      </Forms.LabeledSelect>
    );

    expect(component.getByTestId('select')).toBeTruthy();
  });

  it('sets for of label', () => {
    const label = 'label';
    const expected = 'target-input';
    const component = render(
      <Forms.LabeledSelect label={label} name={expected}>
        {[]}
      </Forms.LabeledSelect>
    );

    expect(component.getByText(label)).toHaveAttribute(
      'for',
      expected
    );
  });

  it('sets name of select', () => {
    const expected = 'name';
    const component = render(
      <Forms.LabeledSelect label="" name={expected}>
        {[]}
      </Forms.LabeledSelect>
    );
    expect(component.getByTestId('select')).toHaveAttribute(
      'name',
      expected
    );
  });

  it('renders provided children', () => {
    const expected = 'expected';
    const component = render(
      <Forms.LabeledSelect label="" name="">
        {[expected]}
      </Forms.LabeledSelect>
    );
    expect(component.container).toHaveTextContent(expected);
  });
});
