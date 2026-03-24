import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import Menu from '../../src/routes/Menu';

describe('Menu Route - Basic', () => {
  it('should render without crashing', () => {
    const { container } = render(() => <Menu />);
    expect(container).toBeInTheDocument();
  });

  it('should display menu title', () => {
    render(() => <Menu />);
    expect(screen.getByText('Our Coffee Menu')).toBeInTheDocument();
  });
});
