![image](/public/twittersearch.png)

## Introduction

[Twitter Search](https://twittersearch.vercel.app/) is a web app that allows you to search who a user is following based on keywords in their bio, username, and location.

## Usage

Enter a Twitter username and a keyword to search for. The app will return a list of users that match the keyword in their bio. You can also search by location if the user has a location set in their profile.

To use multiple keywords, separate them with a comma: `keyword1,keyword2,keyword3`.

`Exact words` option will search for the exact keywords. For example, if you search for `developer` and `Exact words` is checked, the app will search for users that have the word `developer` in their bio.

`All keywords` option will search for all keywords. For example, if you search for `developer,react` and `All keywords` is checked, the app will search for users that have both `developer` and `react` in their bio.

## Purpose

It started when I was trying to find some inspiration from a developer I follow on Twitter. I wanted to see who they were following, but I couldn't find a way to do so. So I decided to build a web app that allows me to search who a user is following based on keywords in their bio, username, and location.

## Lessons Learned

I learned how to use the Twitter API and Nextjs simple API routes. One of the challenges I faced was that the API only returns 1,000 users per request, this would cause the search to be invalid as some users follow more than 1,000 accounts. I was able to use the pagination token to get all the users and then filter them based on the keywords.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vercel](https://vercel.com/)
