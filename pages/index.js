import Head from 'next/head'
import Router from 'next/router';

const Home = () => {
  return (
    <div>
      <Head>
        <title>NextJs Boilerplate</title>
      </Head>
    </div>
  )
}

Home.getInitialProps = context => {
  const country = context.query.country || 'us';

  process.browser
    ? Router.replace('/[country]', `${country}`)
    : context.res.writeHead(302, { Location: `/${country}`});
  
  context.res.end();
}

export default Home;