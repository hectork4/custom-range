import { render, screen } from '@testing-library/react';
import Exercise1 from '../app/exercise1/page';
import { redirect } from 'next/navigation';
import {
  NO_VALUES_MESSAGE,
  FAILED_FETCH_MESSAGE,
} from '@/constants';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

global.fetch = jest.fn();

describe('Exercise1', () => {
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
      json: async () => ({ min: 0, max: 100, rangeValues: [0, 50, 100] }),
    });

    const { container } = render(await Exercise1());

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Normal Range')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('redirects when no data is available', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });

    await Exercise1();

    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });

  it('redirects when data is invalid', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ min: 'invalid', max: 100 }),
    });

    await Exercise1();

    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });

  it('handles fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    await Exercise1();

    expect(consoleErrorSpy).toHaveBeenCalledWith(FAILED_FETCH_MESSAGE, expect.any(Error));
    expect(redirect).toHaveBeenCalledWith(`/?message=${NO_VALUES_MESSAGE}`);
  });
});
