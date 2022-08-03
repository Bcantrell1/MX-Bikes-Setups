import Image from "next/image";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

export default function BikesListingPage() {
  const { data, isLoading, error } = trpc.useQuery(["bikes.categories"]);
  const categories = [...new Set(data?.map((bikes) => bikes.category))];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl lg:px-8">
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {error && <p>Error: {error.message}</p>}
        {categories?.map((bike) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={bike}
          >
            <Link href={`/bikes/${bike}`}>
              <div>
                <Image
                  className="w-full h-full"
                  src={`/bikes/categories/${bike}.jpg`}
                  alt="bike"
                  width={390}
                  height={195}
                />
                <div className="pt-3 ml-4 mr-2 mb-3">
                  <h3 className="text-xl font-medium text-center text-gray-900">
                    {bike}
                  </h3>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

BikesListingPage.auth = true;
