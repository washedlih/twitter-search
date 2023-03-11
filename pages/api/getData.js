export default async function handler(req, res) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PRIVATE_TWITTER_TOKEN}`,
    },
  };
  const { id, token } = req.query;
  let requestURL = `https://api.twitter.com/2/users/${id}/following?max_results=1000&user.fields=description,entities,location,profile_image_url,public_metrics,verified`;

  token &&
    (requestURL = `https://api.twitter.com/2/users/${id}/following?max_results=1000&user.fields=description,entities,location,profile_image_url,public_metrics,verified&pagination_token=${token}`);

  const response = await fetch(requestURL, requestOptions);
  const data = await response.json();

  res.status(200).json(data);
}
