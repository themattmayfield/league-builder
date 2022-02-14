import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import NavBar from 'components/NavBar'
// import Footer from "./Footer";

const Layout: FC = ({ children }) => {
  // useEffect(() => {
  //   console.clear();
  //   console.log("Hi SURE! Hope you enjoy 😀 - MATT");

  // }, []);
  return (
    <>
      <Head>
        <title>League Builder</title>
        <meta name='description' content='League Builder' />
        {/* <link
          rel='shortcut icon'
          type='image/x-icon'
          href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAACH9JREFUWEfFlntwVNUdxz93X9lH3psHCeRBEBIeQQkIqAjSIlC1YqtQijoCImqFtiqKHS3ig1EMVEdURCOxIoq8BBEqPkDeAYKGkIRkkxCWbHaz2d1sdjd7931vBxwypYMjora/v+7MmXO+n/O753y/R+D/XML/Qn/2vMezU1KzBwvapGJ1YmqOShMnNVafOLbuUOOGXwzg6ZkztflXl9ztDKumGYrHX+2MpSTZnV1oNBqyM1Kwm0x88P7Ghb8IwLKXl91dWDTkKWV67wE+rx+brZ2jvky86l4MykkmzxhH1cFKNu34etPPCrB06dIRQ8TAcvlM21hfq4WC5FRqJ07GHa9Hq1LhTBhE9oArSBTCbNm8j207D67/2QDeffPNBX0rKp+vaXfE7QgFOdbYyARHB8/dMI7dDz5Ebn4flFKItLwMujW5PFW6jf17D73+kwEWLFhgKCkpKcvdtWf6zlCMb3V6ag4eoK31NDG/j9rCAbgWP0vq+OsxhEMkG4JsqulmSXkVzZX75/0kgFlTp6ZPnjFjQ76za9z2d1azK68fDRUHcXfYiAb9pKk11NxzF+6595NZPBi9UqDL42LVB5+wfLsNb2tjyWUDrF27NgVZ/jJjyMgSZdlK3ti7j60eH5EOK4REkGI8ozOw8DeT6CgvI14h0+Xp5PiJWo4cOsCanaZ6iyt81eUCCKVlazcMyOt9e51TpP+W9UT272aRx4tN9JIpy8yWJR7p1Zv2995Bc+0I3NY2Tpst1NY1UFNdzXGTZVn1vi8f+9EAK6G377rrVw/cvHdi1edfEPNZsTa3ctOBz8loOIHH3UUxkDR4CO3LX0J1zXC6Ws1Y2x20mFsx1ZuoPFblMDXbrnSaT9p+FMCnifqb2yKxlY5ny3Kk0VOoP9lE5Mxh0vQR4g3xGJ1WspDIH1JE5pjRxOnUuFrN2B0urLYOTp1qoba2jqNHah+2nT75ylkXvijAzqyk4ZlhxdRwKGL1SJGIAsGoFxTjRCky4f3+ozEsWo3FYsfhFYkqVPSJnGL8QCM5/a6gT5aRtAQtUZ8bh92Gw+k+B9DaaqGpsZlvj9cergt0j6WuLnxRgJqslNx0hWZ3RiBUQCCIFI0SliXOKAQ2ygr+dftjJI66CbvDDSo1+vgEDAYdY+IbuDpXQ3buYJRyGKfDicvtOQdgs9kwm1uprTWJplPmUe7W5przGXRBB+rT0hLidep9RjF4pbbbixSJcRazA6hTKXg1LhPzzfNR5g9CEJQYDHpSkxPo27sX+RkGro9bR35KMtWtibg6RTq7PNjtdiwWG83Np6mrP3V/x+n6t/4zAHsAZFA6C9I2qpTCbUl+H2d3H46CNwZNMaiUFbyWMQLFpNmo0nph0MWRmZpMv97p5Of2QqkA/+lqiqIf4Y8VYHUr6XQ5sNnsmM0WTKaW1yxNtfP/O317ABxDei1O6S88HfIH0Yf8xMQwwQBYRGjyw7ZuPZ8VT6XX+ClodTqyjEn0z8kkLSuNhOP7GbK5nNdH/w6710eK7xjZxkRs7W7arO00NZnfa2uqnQnIFwVozEsr6TvVUIHWpxa6wyhCIuFuCTEADT5osSO/ZckSPDfOo/Ca60hN0NMnPRm1WiKwZxszVy9jc9G1bBw2AdEn0uV0kOg9SYIySFNLa7m1qX4OIF3s7XGuA977M3cn3Ki8QXKJKCICiN0QjFBRTXlLavZL39gyJ1aGBr1Y8Ovbdf2KitCrZLyuNho3r2ZhTQV7jANYMXgcKr+IGAghhiL4OqwkhM68YK87/OTFdt5zCE2jk2f2f1UoR5AgIIGohu4Y7Q0+80ufZg88qh66SIr55wU1qYZpD/1NUMoRTlcd5tS6t5mviSGPmczslgBxKhXBGPiDYVSu9jOeDvOfcNZs/6EXl+AsS5yXcIuQJIlRs60qpsjOF5LiBsRpPv5L187PqrJPNcQndTQoSwz+pkqGXjWSHKWA+/OtDPd7mNu3gLHGoThUelSSTGLAxy3tDd52j3XM1rD/xA+Jf68RnR3YOUf7qxHTjUtaUkpGzlqsU/RPT6PxyNcYa+pIA54xJrJSl8taZQLDRQ/jRAe3hdxURqOPz4LSSxH/XoDP7lG/NnHZbQ8JadkgCzTXu3lvk5HKVR+RbGlj7pVqsocbvCveDSeOlAMMQyZHOHfExVKJAUug7bIB1t3K9D+8OPBDCqdAJB0EB9EYPP/bf1L7lY25JUq0WenvrvdGvppX4VqTEAONABoZgnBmh0ThrHOfl1Y9PrBlHpMs1QR+fxcbsu6YkIF+OAj9Qe3ljTvfpvrDk9z5ZwMp6ZHyB3fqHs0zKf/xqrdzZiwMKkANBAXO1MQoHH85AOtvpXBoAeWF07XXMHAUKIvBMIVvPvySt2cs5d6VfdFqvStKl0tlOWLcmvtcrqEJvsi5NDsLoBQgKhOqkMid9J17X1L1dGDrWIZNfjz5qGb0QCXKFIgvJiDm8fqE57jxiVSMObpjh0orRw2bqHm+YE34CbEKIn5QySCc/f/yOdVSk8Tfb4LQJamfj+O5oP7rFHYMnKOZIA+7CsF4BZI2i72r9pNb1Emm3lu15C77H18wUe/doXjUUCYvE/fLRF3fWYwC5AaJB0bCBUFzKRA9HTAvS/4md4x6mGzMRvYHCYe0RIxRYs1my6J7uktWtOM4u2D3HuUM7Wp5bfduCYUNIjHcVok5xbD5UgQvmgUvFJE/f0F8rS4RvaCOEO6QotaKyCGPTrFrx3Zp1ZNmbOcndn2hvC/pY95ib4yTjeypC/HAHVB/OeI9PvDxWCZOuFe/KRhWuqTOgH3P+uic6hBiagbBR3ZdeKc9n6hfVn0izNmxJbxYdvLKNIhdrngPwPoShgejdAbysKdoCU3b8P2LHlnI2ANlOB52cfKnCJ+f+2+njtiwvT3ypQAAAABJRU5ErkJggg=='
        /> */}
      </Head>
      <div className={`min-h-full`}>
        <NavBar />
        <main className='flex-1 '>
          {children}
          {/* <Footer /> */}
        </main>
      </div>
      {/* <NavBar />

      <main className='flex flex-col sm:px-8 lg:px-0 py-8 lg:py-14 w-full max-w-6xl mx-auto '>
        {children}
        <Footer />
      </main> */}
    </>
  )
}
export default Layout
