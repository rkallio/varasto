import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import * as GroupList from '../../src/components/grouplist.jsx';

describe('group', () => {
  it('renders header', () => {
    const expected = 'expected';
    const component = render(
      <GroupList.Group
        header={expected}
        render={() => {}}
        data={[]}
      />
    );

    expect(component.container).toHaveTextContent(expected);
  });
});
