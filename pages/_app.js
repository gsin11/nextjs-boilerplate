import '../styles/globals.css'
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx>{`
        @font-face {
          font-family: 'raleway';
          src: url('/fonts/raleway/Raleway-Regular.ttf') format('truetype');
        }

        :global(html), :global(body) {
          font-family: 'raleway';
        }

        :global(ul) {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
      `}</style>
    </>
  )
}

export default MyApp
