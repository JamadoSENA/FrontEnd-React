// Title.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Dashboards/Title';

describe('Title component', () => {
  test('renderiza el texto pasado como children', () => {
    render(<Title>Hola Mundo</Title>);
    const titleElement = screen.getByText('Hola Mundo');
    expect(titleElement).toBeInTheDocument();
  });

  test('usa el componente Typography con variante h6', () => {
    const { container } = render(<Title>Test</Title>);
    const typography = container.querySelector('h2');
    expect(typography).toBeInTheDocument();
    expect(typography.tagName).toBe('H2');
  });
});
