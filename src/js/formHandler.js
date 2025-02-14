import { handleSubmit } from '../src/js/formHandler';

test('handleSubmit should call preventDefault and fetch API', async () => {
  const event = {
    preventDefault: jest.fn(),
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ polarity: 'positive' }),
    })
  );

  document.body.innerHTML = '<input id="url" value="https://example.com"><div id="results"></div>';

  await handleSubmit(event);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/nlp', expect.any(Object));
});
