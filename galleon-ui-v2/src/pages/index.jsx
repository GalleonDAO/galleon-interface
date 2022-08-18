import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Head>
        <title>Galleon - We build on-chain investment themes</title>
        <meta
          name="description"
          content="Galleon is a DAO of methodologists researching, designing, and creating best-in-class structured products."
        />
      </Head>
      <Header />
      <main className='bg-theme-oldlace'>
       <div className=" md:bg-[url('/hero-bg.png')] bg-cover bg-no-repeat bg-right-top  ">
           <Hero />
        </div>
  
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
