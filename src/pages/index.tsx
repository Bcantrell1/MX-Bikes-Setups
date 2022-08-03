import type { NextPage } from "next";
import Link from "next/link";
import Subscribe from "../components/subscribe";

const Home: NextPage = () => {
  return (
    <>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
            Create and share MX Bikes
            <span className="text-orange-600"> Setups</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Select your bike of choice and create a setup to share with your
            friends! Or maybe just browse and test the existing public setups.
          </p>
        </div>
        <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
          <Link href="/bikes">
            <span className="cursor-pointer px-10 py-3.5 w-full hover:bg-orange-700 bg-orange-600 text-white text-center rounded-md shadow-md block sm:w-auto">
              See Bikes
            </span>
          </Link>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default Home;
