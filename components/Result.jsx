import Image from "next/image";
import React from "react";

const Result = ({ data }) => {
  data.sort((a, b) => {
    return b.public_metrics.followers_count - a.public_metrics.followers_count;
  });
  return (
    <div className="mb-10 flex flex-col border-t pb-[3em]">
      {data.map((item) => {
        return (
          <a
            href={`https://twitter.com/${item.username}`}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="odd:rounded-lg odd:bg-white even:bg-slate-50 even:hover:rounded-lg"
          >
            <div className="flex gap-4 rounded-lg px-6 py-4 text-base text-gray-900 hover:bg-black/[.05] md:text-lg">
              {item.profile_image_url && (
                <div className="flex items-center justify-center">
                  <Image
                    className="inline-block h-[90px] w-[90px] rounded-full shadow-md"
                    src={item.profile_image_url.replace("_normal", "_400x400")}
                    alt={item.username}
                    width={90}
                    height={90}
                  />
                </div>
              )}
              <div className="flex max-w-[220px] flex-col items-start md:max-w-md">
                <span className="flex flex-col gap-x-1 gap-y-0 md:flex-row">
                  <p className="break-words font-bold text-slate-800">{item.name}</p>
                  <span className="flex gap-1">
                    <p className="break-words">{`@${item.username}`}</p>
                    {item.verified === true && (
                      <Image src="/verified.svg" width={20} height={20} alt="Verified" />
                    )}
                  </span>
                </span>
                <p className="mt-1 break-words text-sm italic md:text-base">{item.description}</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Result;
