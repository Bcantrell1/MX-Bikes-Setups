import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

export default function BikesCategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data, isLoading, error } = trpc.useQuery([
    "bikes.category-bikes",
    {
      category: category as string,
    },
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {category}
      </h2>
      <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {error && <p>Error: {error.message}</p>}
        {data?.map((bike) => (
          <Link
            href={`/bikes/${category}/${bike.name}`}
            key={bike.id}
            className="w-full min-h-30  aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-30 aspect-none"
          >
            <div className="group relative cursor-pointer">
              <div className="w-full min-h-30  aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-30 aspect-none">
                <Image
                  src={`/bikes/${bike.image}`}
                  alt={bike.name || "image"}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  width={400}
                  height={275}
                />
              </div>

              <p className="font-medium text-center">{bike.name}</p>
            </div>
          </Link>
        ))}
      </article>
    </div>
  );
}

BikesCategoryPage.auth = true;
