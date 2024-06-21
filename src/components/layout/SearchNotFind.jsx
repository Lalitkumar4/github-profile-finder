const SearchNotFind = () => {
  return (
    <>
      <h1 className="mb-6 text-4xl font-medium md:text-6xl">Oops!</h1>
      <p className="my-2 text-xl font-medium md:text-2xl">
        Your search did not match any users
      </p>
      <p className="text-sm text-gray-300">
        Please try a different search query.
      </p>
    </>
  )
}

export default SearchNotFind
