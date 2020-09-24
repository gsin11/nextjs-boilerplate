const CustomError = ({statusCode}) => {
  if(statusCode === 404) {
    return <h1>{statusCode} - The resource was not found...</h1>
  }
  
  return <h1>{statusCode} - Oops.! Something went wrong...</h1>
}

CustomError.getInitialProps = ({err, res}) => {
  return {statusCode: res? res.statusCode : err ? err.statusCode : 404 };
}

export default CustomError;