import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogList from './Blog'

test('renders blog title and author', () => {
  const blogs = [{
    id: 'blog1',
    title: 'Component testing is done with react-testing-library',
    author: 'Näin on marjat',
    url: 'http://example.com',
    likes: 1,
    user: {
      id: 'user',
      name: 'Testi User',
      username: 'testuser'
    }
  },
  {
    id: 'blog2',
    title: 'toinen',
    author: 'testaaja',
    url: 'http://esimerkki.com/',
    likes: 5,
    user: {
      id: 'testi',
      name: 'Testaus',
      username: 'joo'
    }
  }]



  render(<BlogList blogs={blogs} />)

  const titleElement = screen.getByText('Component testing is done with react-testing-library')
  const authorElement = screen.getByText('Näin on marjat')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
})


