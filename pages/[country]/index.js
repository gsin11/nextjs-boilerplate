import {useEffect} from 'react';
import axios from 'axios';
import cookie from 'nookies';
import Link from 'next/link';
import Thumbnail from '../../components/Thumbnail';
import Error from 'next/error';

const Home = ({shows = {}, country, statusCode}) => {
  const renderShows = () => {
    return shows.map((showItem, index) => {
      const {show} = showItem;
      return (
        <li key={index}>
          <Link href="/[country]/[showId]" as={`/${country}/${showItem.id}`}>
            <a>
              <Thumbnail imageUrl={show.image.medium} caption={show.name} />
            </a>
          </Link>
        </li>
      );
    });
  }
  if(statusCode) {
    return <Error statusCode={statusCode} title="Oops! There was a problem here..."></Error>
  }
  return (
    <>
      <ul className="tvshows-grid">
        {renderShows()}

        <style jsx>{`
          .tvshows-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        `}</style>
      </ul>
    </>
  )
};

Home.getInitialProps = async (context) => {
  try {
    const { defaultCountry } = cookie.get(context);
    const country = context.query.country || defaultCountry;
    const response = await axios.get(`https://api.tvmaze.com/schedule?country=${country}&date=2020-09-01`);

    return {
      shows: response.data,
      country,
    }
  } catch(error) {
    return {
      statusCode: (error.response) ? error.response.status : 500
    }
  }
}

export default Home;