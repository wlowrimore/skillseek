import React from "react";

const About = () => {
  return (
    <>
      <section className="container mx-auto blue_container md:mt-16">
        <h1 className="w-full font-bold text-3xl mt-12 md:mt-0 pb-4 border-b ">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10 md:py-24">
          <div className="flex justify-center items-start pr-2 md:pr-0 pb-10 md:pb-0">
            <img
              src="/community_sharing.webp"
              alt="community sharing"
              width={1000}
              height={1000}
              className="w-full md:w-4/5 h-auto rounded-full border border-neutral-600 opacity-90 shadow-xl shadow-neutral-800"
            />
          </div>
          <div className="flex-1 flex flex-col md:h-[37.8rem] overflow-y-auto p-3">
            <p className="text-lg leading-6">
              <span className="text-xl font-semibold">
                SkillSeek is 100% about community.{" "}
              </span>{" "}
              We understand that every individual possesses unique talents,
              skills, and experiences that can benefit others. Our platform
              breaks down traditional barriers to service exchange, creating a
              dynamic ecosystem where neighbors become resources for one
              another. Whether you're a handyman who can fix a leaky faucet, a
              graphic designer who can help create a small business logo, or a
              gardener willing to share landscaping tips, SkillSeek provides the
              bridge that connects local talent with local needs.
            </p>

            <p className="text-lg leading-6 pt-4">
              Beyond individual skill-sharing, we're committed to empowering
              local businesses that are the heartbeat of our communities. By
              creating strategic partnerships with small, local enterprises,
              SkillSeek ensures that when a specific skill or service isn't
              immediately available through our community network, users are
              directed to trusted local businesses. These partnerships come with
              exclusive discounts and offers, creating a win-win scenario that
              supports local economic growth and provides added value to our
              users.
            </p>

            <p className="text-lg leading-6 pt-4">
              Technology today often disconnects us, but SkillSeek is different.
              We're building more than just an app—we're cultivating a movement
              of mutual support, learning, and genuine human connection. In a
              world where impersonal digital interactions are the norm, we're
              creating a space that celebrates personal skills, promotes
              neighborly kindness, and reinforces the idea that we are stronger
              when we work together. By valuing each person's unique abilities
              and fostering an environment of trust and collaboration, SkillSeek
              aims to redefine how communities interact, support, and elevate
              one another.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
