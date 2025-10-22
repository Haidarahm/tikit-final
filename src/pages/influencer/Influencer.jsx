import React from 'react'
import Hero from './Hero'
import { InfluencerDetails } from './InfluencerDetails'

export const Influencer = () => {
  return (
    <div className='influencers-section  snap-mandatory snap-y w-full '>
      <Hero />
      <InfluencerDetails/>
      <InfluencerDetails/>
    </div>
  )
}
