import { Metadata } from 'next'

import { Header, Footer, Provider } from '@/components/templates'

import './globals.css'

export const metadata: Metadata = {
  title: 'Cravings Fix',
  description:
    'Discover a delectable array of Asian flavors at Cravings Fix. Indulge in our curated selection of mouthwatering dishes from the East, featuring a fusion of traditional and modern culinary delights. Satisfy your cravings for authentic Asian cuisine with our convenient online ordering, bringing the best of Asia right to your doorstep. Explore a world of taste sensations and embark on a culinary journey with Cravings Fix.',
  keywords:
    'Asian cuisine, East Asian dishes, Asian flavors, online food ordering, Asian food delivery, authentic Asian recipes, Asian fusion, Asian delicacies, Asian specialties, Chinese cuisine, Japanese cuisine, Korean cuisine, Thai cuisine, Vietnamese cuisine, Indian cuisine, Malaysian cuisine, Indonesian cuisine, Singaporean cuisine, Asian ingredients, traditional recipes, modern Asian dishes, flavorful dining, culinary exploration, taste sensations, food cravings.',
  viewport: 'width=device-width, initial-scale=1',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />

          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
