import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { FeaturesSection } from '../App'

// Basic smoke tests for FeaturesSection
describe('FeaturesSection', () => {
  it('renders feature titles', () => {
    render(<FeaturesSection theme="light" />)
    expect(screen.getByText(/Zero Latency/i)).toBeTruthy()
    expect(screen.getByText(/Live Presence/i)).toBeTruthy()
  })

  it('toggles details when Learn more clicked', () => {
    render(<FeaturesSection theme="light" />)
    const learnButtons = screen.getAllByText(/Learn more/i)
    expect(learnButtons.length).toBeGreaterThan(0)
    fireEvent.click(learnButtons[0])
    expect(screen.getByText(/Optimized socket transport/i)).toBeTruthy()
  })
})
