import axios from 'axios';
import parse from 'html-react-parser';
import CustomError from '../_error';

const ShowDetails = ({ show = {}, statusCode }) => {
  const { name, image, summary } = show;

  if(statusCode) {
    return <CustomError statusCode={statusCode} />
  }

  return (
    <>
      <div className="show-details">
        <img className="show-details__poster" src={(image) ? image.medium : undefined} alt={name} />
        <h1>{name}</h1>
        {summary && parse(summary)}
        <style jsx>{`
          .show-details__poster {
            height: 350px;
          }
        `}</style>
      </div>
    </>
  )
};

ShowDetails.getInitialProps = async ( {query} ) => {
  try {
    const { showId } = query;
    const response = await axios.get(`https://api.tvmaze.com/episodes/${showId}?embed=show`);

    return {
      show: response.data._embedded.show
    }
  } catch (error) {
    return {
      statusCode: (error.response) ? error.response.status : 500
    }
  }
}

export default ShowDetails;