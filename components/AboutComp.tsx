const AboutComp = () => {
  return (
    <>
      <section className="container px-4 w-full md:mx-auto mt-12 md:mt-12 md:mb-6 flex flex-col justify-center items-center bg-slate-100">
        <h1 className="w-full font-bold text-3xl mt-8 md:mt-12 lg:pt-6 pb-4 border-b ">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:flex flex-col lg:grid-cols-2 py-10 md:py-12">
          <div className="w-full mx-auto pb-1 flex md:px-6">
            <img
              src="/community_sharing_flat.webp"
              alt="community sharing"
              width={1000}
              height={1000}
              className="w-full max-h-[14.5rem] opacity-70 brightness-70 object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col overflow-y-auto py-3 md:px-6">
            <p className="text-lg leading-6 pl-1">
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

export default AboutComp;
