import React from "react";
const Learn = () => {
  const yt_url = "http://localhost:4000/yt-video"
  return (
    <section id="Learn More" className="bg-black p-12 h-fit mt-12">
      <div className="flex justify-around">
        <div className=" w-[400px]">
          <p className="text-gradient font-brico text-[40px]">
            Learn how Quadratic Funding Works
          </p>
          <br />
          <p className="text-yellow-100  font-brico text-[20px]">
            The attached video goes into much detail on the mechanics and math
            of how QF works; later you can use the below QF calculator to
            simulate the funding with testnet ETH!
          </p>
        </div>

        <video controls width="760" height={480}>
          <source src={yt_url} type="video/webm" />
          <source src={yt_url} type="video/mp4" />
        </video>
      </div>

      <div>
        <p className="mt-16 font-brico ml-28 text-gradient text-[40px]">
          More Resources!
        </p>
        <div className="flex justify-center m-10">
          <embed
            className="rounded-2xl mr-20"
            width="580"
            height="700"
            type="text/html"
            src="https://vitalik.ca/general/2019/12/07/quadratic.html"
            frameborder="0"
          ></embed>

          <embed
            className="rounded-2xl"
            type="text/html"
            width="580"
            height="700"
            src="https://www.google.com/url?q=https://cointelegraph.com/explained/quadratic-funding-the-future-of-crowdfunding-explained&usg=AOvVaw3Wlp-Vt9v9foGCjiypW6VN&cs=1&hl=en-PK"
            frameborder="0"
          ></embed>
        </div>
      </div>
    </section>
  );
};

export default Learn;
