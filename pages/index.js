import Head from "next/head";
import { useRef, useState } from "react";
import Result from "../components/Result";
import { Check, Loader2 } from "lucide-react";
import Alert from "../components/Alert";
import Footer from "@/components/Footer";

export default function Home() {
  const [user, setUser] = useState("washedlih");
  const [newUser, setNewUser] = useState("");
  const [data, setData] = useState([]);
  const [finished, setFinished] = useState(true);
  const [results, setResults] = useState();
  const [keywords, setKeywords] = useState("web,design");
  const [exactWords, setExactWords] = useState(false);
  const [allKeywords, setAllKeywords] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef();

  const hasKeywords = (item, keywords, exactWords) => {
    let fields = [
      item.description,
      item.username,
      item.name,
      item.location,
      item.entities?.url?.urls?.[0]?.expanded_url,
    ].filter(Boolean);

    exactWords
      ? (fields = fields.map((field) => field.toLowerCase().split(" ")))
      : (fields = fields.map((field) => field.toLowerCase()));
    return fields.some((field) => field.includes(keywords));
  };

  const handleInput = (input) => {
    if (input[0] === " ") {
      input = input.slice(1);
    }
    if (input[input.length - 1] === " ") {
      input = input.slice(0, -1);
    }
    return input;
  };

  const getID = async (user) => {
    const response = await fetch(`/api/getId?user=${user}`);
    const data = await response.json();
    if (data.errors) {
      return;
    } else {
      return data.data.id;
    }
  };

  const getData = async (e) => {
    e.preventDefault();
    setFinished(false);
    const newKeywords = [];
    const newData = [];
    inputRef.current.blur();

    let newUser;
    if (user.includes("/status")) {
      newUser = user.split("/status")[0].split("/").pop();
    } else if (user.includes("?")) {
      newUser = user.split("?")[0].split("/").pop();
    } else if (user.includes("/")) {
      newUser = user.split("/").pop();
    } else if (user.includes("@")) {
      newUser = user.split("@")[1];
    } else {
      newUser = user;
    } // handles different types of twitter urls
    setNewUser(newUser);

    if (user === "") {
      setFinished(true);
      setTitle("Invalid Username");
      setDescription("Please enter a valid username.");
      setOpenToast(true);
      if (openToast) {
        setOpenToast(false);
        setTimeout(() => {
          setOpenToast(true);
        }, 350);
      }
      return;
    } else {
      newUser = handleInput(newUser);
      var id = await getID(newUser);
      setUser(newUser);
    }

    let slicedKeywords = handleInput(keywords);
    keywords.includes(",")
      ? slicedKeywords.split(",").forEach((keyword) => newKeywords.push(keyword))
      : newKeywords.push(slicedKeywords);
    setKeywords(slicedKeywords);

    const response = await fetch(`/api/getData?id=${id}`);
    const data = await response.json();

    if (id === undefined && data.status !== 429) {
      setFinished(true);
      setTitle("User not found");
      setDescription("Please enter a valid user.");
      setOpenToast(true);
      setUser("");
      if (openToast) {
        setOpenToast(false);
        setTimeout(() => {
          setOpenToast(true);
        }, 350);
      }
    } else if (keywords === "") {
      setFinished(true);
      setTitle("Invalid Keywords");
      setDescription("Please enter a valid keyword.");
      setOpenToast(true);
      if (openToast) {
        setOpenToast(false);
        setTimeout(() => {
          setOpenToast(true);
        }, 350);
      }
    } else if (data.status === 429) {
      setFinished(true);
      setTitle("Rate Limited");
      setDescription("Please try again later.");
      setOpenToast(true);
      if (openToast) {
        setOpenToast(false);
        setTimeout(() => {
          setOpenToast(true);
        }, 350);
      }
    } else {
      while (data.meta.next_token) {
        const response = await fetch(`/api/getData?id=${id}&token=${data.meta.next_token}`);
        const data2 = await response.json();
        data.meta.next_token = data2.meta.next_token;
        data.data = data.data.concat(data2.data);
      }
      for (let i = 0; i < data.data.length; i++) {
        const keywordMatch = allKeywords
          ? newKeywords.every((keyword) => hasKeywords(data.data[i], keyword, exactWords))
          : newKeywords.some((keyword) => hasKeywords(data.data[i], keyword, exactWords));
        if ((!allKeywords && keywordMatch) || (allKeywords && keywordMatch)) {
          newData.push(data.data[i]);
        }
      }
      if (newData.length === 0) {
        setFinished(true);
        setTitle("No results found");
        setDescription("Please try again with different keywords.");
        setOpenToast(true);
        if (openToast) {
          setOpenToast(false);
          setTimeout(() => {
            setOpenToast(true);
          }, 350);
        }
      }
    }
    setResults(newData.length);
    setData(newData);
    setFinished(true);
  };

  return (
    <>
      <Head>
        <title>Twitter Search Following</title>
        <meta name="description" content="Search who a user is following" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Alert open={openToast} setOpen={setOpenToast} title={title} description={description} />
        <div className="relative mb-2 flex min-h-[100svh] flex-col items-center sm:mb-0">
          <h1 className="mt-10 mb-4 bg-gradient-to-r from-[#050586] to-[#41B3FF] bg-clip-text font-sfpro text-2xl font-bold tracking-[-0.04em] text-transparent drop-shadow-sm md:text-4xl md:tracking-normal">
            Search who a user is following
          </h1>
          <form action="" onSubmit={(e) => getData(e)} className="flex flex-col gap-2 md:flex-row">
            <input
              type="text"
              className="h-[48px] w-[250px] rounded-md border border-solid border-gray-300 px-3 outline-none transition-colors focus:border-black focus:outline-1"
              placeholder="Enter a Twitter username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              spellCheck="false"
              autoCorrect="off"
              autoCapitalize="none"
              ref={inputRef}
            />
            <input
              type="text"
              value={keywords}
              className="h-[48px] w-[250px] rounded-md border border-solid border-gray-300 px-3 outline-none transition-colors focus:border-black focus:outline-1"
              placeholder="Enter keywords"
              onChange={(e) => setKeywords(e.target.value)}
              spellCheck="false"
              autoCorrect="off"
              autoCapitalize="none"
              ref={inputRef}
            />
            <div className="flex justify-between md:gap-4">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="exactWords"
                  className="flex cursor-pointer select-none items-center justify-center"
                >
                  <span className="relative mr-2 flex items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={(e) => setExactWords(e.target.checked)}
                      id="exactWords"
                      className="h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white outline-none transition-colors checked:border-black checked:bg-black focus-visible:outline-2 focus-visible:outline-black"
                    />
                    <span className="absolute flex items-center justify-center">
                      <Check width={14} height={14} color="white" />
                    </span>
                  </span>
                  Exact words
                </label>

                <label
                  htmlFor="allKeywords"
                  className="flex cursor-pointer select-none items-center justify-center"
                >
                  <span className="relative mr-2 flex items-center justify-center">
                    <input
                      type="checkbox"
                      onChange={(e) => setAllKeywords(e.target.checked)}
                      checked={allKeywords}
                      id="allKeywords"
                      className="h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white outline-none transition-colors checked:border-black checked:bg-black focus-visible:outline-2 focus-visible:outline-black"
                    />
                    <span className="absolute flex items-center justify-center">
                      <Check width={14} height={14} color="white" />
                    </span>
                  </span>
                  All keywords
                </label>
              </div>
              <button
                type="submit"
                className={`flex h-[48px] ${
                  finished ? `w-[100px] justify-center` : `w-[130px] gap-1 px-2`
                } select-none items-center rounded-md border border-solid border-black bg-black px-3 text-white outline-none transition focus-visible:outline-2 focus-visible:outline-black`}
                disabled={!finished}
              >
                {finished ? null : <Loader2 color="white" size={20} className="animate-spin" />}
                {finished ? "Search" : "Searching..."}
              </button>
            </div>
          </form>
          <div className="flex flex-col">
            <h2 className="my-4 break-words text-center text-xl font-bold">
              {results ? `Showing ${results} ${results > 1 ? "results" : "result"} for ` : null}
              {results ? (
                <a
                  className="text-blue-600 opacity-70 hover:underline hover:decoration-blue-600/30 hover:underline-offset-2 hover:opacity-100"
                  href={`https://twitter.com/${user}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newUser}
                </a>
              ) : null}
            </h2>
          </div>
          <Result data={data} />
          <Footer />
        </div>
      </main>
    </>
  );
}
