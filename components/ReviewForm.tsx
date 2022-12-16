import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from './Form/Input';
import { Textarea } from './Form/Textarea';
import { Radio } from './Form/Radio';
import { useCreateProductReviewMutation } from '../generated/graphql';

const reviewtFormchema = yup.object({
  headline: yup.string().required('Pole jest wymagane'),
  name: yup.string().required('Pole jest wymagane'),
  email: yup
    .string()
    .email('Niepoprawny format adresu email')
    .required('Pole jest wymagane'),
  content: yup
    .string()
    .max(240, 'Maksymalna długość wiadomości to 240 znaków')
    .required('Pole jest wymagane'),
  rating: yup.number().nullable(),
});

type ReviewtFormData = yup.InferType<typeof reviewtFormchema>;

export const ReviewtForm = ({ slug }: { slug: string }) => {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();
  const methods = useForm<ReviewtFormData>({
    resolver: yupResolver(reviewtFormchema),
  });
  const onSubmit = (data: ReviewtFormData) => {
    createReview({
      variables: {
        review: {
          product: {
            connect: {
              slug: slug,
            },
          },
          ...data,
        },
      },
    });
  };

  return (
    <>
      {loading && <div>Ładowanie...</div>}
      {error && <div>Błąd: error</div>}
      {data && <div>{data.review?.name} dziękujemy za dodanie recenzji</div>}
      {!data && (
        <FormProvider {...methods}>
          <h1 className="text-2xl font-bold sm:text-3xl my-8">
            Wystaw opinię o produkcie
          </h1>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-6 gap-4"
          >
            <div className="col-span-6">
              <Input name="headline" label="Tytuł" sr />
            </div>
            <div className="col-span-6">
              <Input name="name" label="Imię" sr />
            </div>
            <div className="col-span-6">
              <Input name="email" label="Email" sr />
            </div>
            <div className="col-span-6">
              <Textarea name="content" label="Recenzja" sr />
            </div>
            <div className="col-span-6">
              <fieldset className="flex flex-wrap gap-3">
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                  Ocena:
                </legend>
                {[1, 2, 3, 4, 5].map((el) => {
                  return (
                    <div key={el}>
                      <Radio name="rating" value={el} />
                    </div>
                  );
                })}
              </fieldset>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
              >
                <span className="font-medium">Wyślij opinię</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};
