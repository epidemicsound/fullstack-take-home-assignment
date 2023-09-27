import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

test('renders app with tracks tab', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/No tracks/i);
  expect(linkElement).toBeInTheDocument();
});
