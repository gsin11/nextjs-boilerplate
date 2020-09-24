import Head from 'next/head'
import Router from 'next/router';
import cookie from 'nookies';

const Home = () => {
  return (
    <div>
      <Head>
        <title>NextJs Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

Home.getInitialProps = context => {
  const { defaultCountry } = cookie.get(context);

  const country = context.query.country || defaultCountry || 'us';

  process.browser
    ? Router.replace('/[country]', `${country}`)
    : context.res.writeHead(302, { Location: `/${country}`});
  
  context.res.end();
}

export default Home;