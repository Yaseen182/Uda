import { handleSubmit } from '../src/js/formHandler';

// Mock fetch API and preventDefault function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ polarity: 'positive' })
    })
  );
});

test('handleSubmit should call preventDefault and fetch API', async () => {
  const event = {
    preventDefault: jest.fn(),
  };

  document.body.innerHTML = '<input id="url" value="https://example.com"><div id="results"></div>';

  await handleSubmit(event);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/nlp', expect.any(Object));
  expect(document.getElementById('results').innerHTML).toBe('Polarity: positive');
});
