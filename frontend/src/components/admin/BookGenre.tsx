import { bookGenres } from "../../data/bookGenres";
import { useFormContext } from "react-hook-form";
import { BookType } from "../../types/Types";

const Genre = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookType>();

  return (
    <div className="flex flex-col gap-1">
      <label>Book Genre</label>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3 max-h-[350px] overflow-auto">
        {bookGenres.map((genre) => (
          <label
            key={genre}
            className="flex flex-row gap-1 border border-light-400 py-1 px-3 rounded-md"
          >
            <input
              className="px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
              type="checkbox"
              key={genre}
              value={genre}
              {...register("gener", {
                validate: (genres) => {
                  return genres?.length > 0 || "At least one genre is required";
                },
              })}
            />
            {genre}
          </label>
        ))}
      </div>
      {errors?.gener && (
        <span className="text-sm text-red-500 font-semibold place-self-end">
          {errors?.gener?.message}
        </span>
      )}
    </div>
  );
};

export default Genre;
