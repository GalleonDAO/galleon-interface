import Image from 'next/future/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logo1kx from '@/images/backers/1kx.png'
import logoMexc from '@/images/backers/mexc.png'
import logoNothingResearch from '@/images/backers/nothing.png'
import logoAngelDAO from '@/images/backers/angel.png'
import logoFireEyes from '@/images/backers/fire.png'

export function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-48 font-wigrum">
      <h1 className="font-morion font-bold mx-auto max-w-4xl text-5xl  tracking-tight text-theme-navy sm:text-7xl">
        {' '}
        <span className="relative whitespace-nowrap text-theme-navy">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-theme-navy opacity-20"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">Asset Management</span>
        </span>{' '}
        Guild.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-theme-navy">
       Galleon is a DAO of methodologists researching, designing, and creating best-in-class thematic, leverage and yield based structured products.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="https://app.galleon.community"   className={"border-theme-navy border"}>Enter App</Button>
        <Button
          href="https://discord.gg/galleondao"
          target="_blank"
          variant="outline"
        className={"border-theme-navy border hover:opacity-60 "}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
</svg>
          
      
          <span className="ml-3 font-semibold">Join the Crew</span>
        </Button>
      </div>
      <div className="mt-36 lg:mt-44">
        <p className="text-lg text-theme-navy">
          Trusted & backed by industry leaders
        </p>
        <ul
          role="list"
          className="flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {[
            [
              { name: '1kx', logo: logo1kx },
              { name: 'Nothing Research', logo: logoNothingResearch },
              { name: 'MEXC', logo: logoMexc },
            ],
            [
              { name: 'FireEyes', logo: logoFireEyes },
              { name: 'Angel DAO', logo: logoAngelDAO },

            ],
          ].map((group, groupIndex) => (
            <li key={groupIndex}>
              <ul
                role="list"
                className="flex w-32 h-32 sm:w-full sm:h-full  flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                {group.map((company) => (
                  <li key={company.name} className="flex">
                    <Image src={company.logo} alt={company.name}  unoptimized />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
