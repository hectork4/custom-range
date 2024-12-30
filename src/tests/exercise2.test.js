import { render, screen } from '@testing-library/react';
import Exercise2 from '../app/exercise2/page';
import { redirect } from 'next/navigation';
import {
  NO_VALUES_MESSAGE,
  FAILED_FETCH_MESSAGE,
} from '@/constants';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

global.fetch = jest.fn();

describe('Exercise2', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    fetch.mockClear();
    redirect.mockClear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders correctly with valid data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ rangeValues: [0, 50, 100] }),
    });

    const { container } = render(await Exercise2());

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Fixed Values')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('redirects when no data is available', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ rangeValues: [] }),
    });

    await Exercise2();

    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });

  it('redirects when data is invalid', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ rangeValues: null }),
    });

    await Exercise2();

    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });

  it('handles fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    await Exercise2();

    expect(consoleErrorSpy).toHaveBeenCalledWith(FAILED_FETCH_MESSAGE, expect.any(Error));
    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });
});
