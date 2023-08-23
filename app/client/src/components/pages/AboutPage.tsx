import React from 'react'
import { Welcome } from '../atoms'

export const AboutPage = () => {
  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">About Us</h1>

      <p className="prose lg:prose-xl">
        <Welcome />
        <br />
        <br />
        🍽️ Discover a delectable array of Asian flavors that will transport your
        taste buds to the heart of the East. Our curated selection of
        mouthwatering dishes offers a fusion of traditional and modern culinary
        delights, satisfying your cravings for authentic Asian cuisine.
        <br />
        <br />
        With our convenient online ordering, you can enjoy the best of Asia from
        the comfort of your home. Join us on a culinary journey and indulge in
        the richness of taste and tradition at Cravings Fix.
      </p>
    </main>
  )
}
