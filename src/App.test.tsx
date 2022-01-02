import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';
import CarModels from './components/CarModels';
import Home from './components/Home';
import userEvent from '@testing-library/user-event';



test('renders home screen', () => {
  render(<MemoryRouter>
    <App/>
  </MemoryRouter>);
  const linkElement = screen.getByText("ALL CARS",{exact : false});
  expect(linkElement).toBeInTheDocument();
});


test(' render Home page on "/" ' ,() => {
  // jest.doMock('./components/Home',() => () => <Home/>);
    render(<MemoryRouter initialEntries={['/']}>
      <App/>
    </MemoryRouter>);
    expect(screen.getByText("ALL CARS")).toBeInTheDocument();
    jest.unmock('./components/Home');
});

test(' render Models page on "/models" ',() => {
  render(<MemoryRouter initialEntries={['/models']}>
    <App/>
  </MemoryRouter>);
  userEvent.click(screen.getByText("ALL CARS"));
  expect(screen.getByText("ALL MODELS")).toBeInTheDocument();
});


