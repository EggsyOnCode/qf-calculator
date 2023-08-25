import React from "react";
const Learn = () => {
  const yt_url = "http://localhost:4000/yt-video/learn-qf.mp4"
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

        <video src={yt_url} width="750" height="500" controls></video>
      </div>

      <div>
        <p className="mt-16 font-brico ml-28 text-gradient text-[40px]">
          More Resources!
        </p>
        <div className="flex justify-center m-10">
          {/* <iframe
            className="rounded-2xl mr-20"
            width="580"
            height="700"
            src="https://vitalik.ca/general/2019/12/07/quadratic.html"
            frameborder="0"
          ></iframe>

          <iframe
            className="rounded-2xl"
            width="580"
            height="700"
            src="https://www.google.com/url?q=https://cointelegraph.com/explained/quadratic-funding-the-future-of-crowdfunding-explained&usg=AOvVaw3Wlp-Vt9v9foGCjiypW6VN&cs=1&hl=en-PK"
            frameborder="0"
          ></iframe> */}
        </div>
      </div>
    </section>
  );
};

export default Learn;
