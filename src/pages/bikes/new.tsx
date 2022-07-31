import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { CreateBikeInput } from "../../schema/bike.schema";
import { trpc } from "../../utils/trpc";

function CreateBikePage() {
    const {handleSubmit, register} = useForm<CreateBikeInput>();
    const router = useRouter();

    const {mutate, error} = trpc.useMutation(['bikes.create-bike'], {
        onSuccess: ({category}) => router.push(`/bikes/${category}`),
    });

    function onSubmit(values: CreateBikeInput) {
        mutate(values);
      }

      return (
        <div className="h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg">
              {error && error.message}
              <label className="text-gray-700 font-bold py-2" htmlFor="name">Name</label>
              <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3" type="text" placeholder="Bike Name" {...register('name')} />
              <label className="text-gray-700 font-bold py-2" htmlFor="name">Category</label>
              <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-6" type="text" placeholder="Bike Category" {...register('category')} />
              <button className="bg-orange-600 hover:bg-orange-800 text-white font-bold rounded py-2 px-4">Create bike</button>
          </form>
        </div>
      )
}

export default CreateBikePage;