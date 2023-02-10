export default async function handler(req, res) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PRIVATE_TWITTER_TOKEN}`,
    },
  };
  const { user } = req.query;
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${user}`,
    requestOptions,
  );
  const data = await response.json();
  res.status(200).json({ id: data });
}
