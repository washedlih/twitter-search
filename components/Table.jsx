import Image from "next/image";
import React from "react";

const Table = ({ data }) => {
  data.sort((a, b) => {
    return b.public_metrics.followers_count - a.public_metrics.followers_count;
  });
  return (
    <div className="flex flex-col pb-[3em]">
      <table className="mb-10">
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id} className="border-t odd:bg-white even:bg-slate-50">
                <td className="flex gap-4 px-6 py-4 text-base text-gray-900 md:text-lg ">
                  {item.profile_image_url && (
                    <a
                      href={`https://twitter.com/${item.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block h-[90px] w-[90px]"
                    >
                      <Image
                        className="rounded-full shadow-md"
                        src={item.profile_image_url.replace("_normal", "_400x400")}
                        alt={item.username}
                        width={90}
                        height={90}
                      />
                    </a>
                  )}
                  <div className="flex max-w-[220px] flex-col items-start md:max-w-md">
                    <span className="flex flex-col gap-x-1 gap-y-0 md:flex-row">
                      <a
                        href={`https://twitter.com/${item.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="break-words font-bold text-slate-800 hover:text-sky-500">
                          {item.name}
                        </p>
                      </a>
                      <span className="flex gap-1">
                        <a
                          href={`https://twitter.com/${item.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p className="break-words hover:text-sky-500">{`@${item.username}`}</p>
                        </a>
                        {item.verified === true && (
                          <Image src="/verified.svg" width={20} height={20} alt="Verified" />
                        )}
                      </span>
                    </span>
                    <p className="mt-1 break-words text-sm italic md:text-base">
                      {item.description}
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
