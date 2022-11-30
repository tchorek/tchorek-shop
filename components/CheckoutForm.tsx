import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Form/Input";
import { Select } from "./Form/Select";
import { validateMMYY, validatePostalCode } from "../utils";

const checkoutFormSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "Imię jest za krótkie")
    .max(20, "Nazwisko jest za długie")
    .required(),
  lastName: yup
    .string()
    .min(3, "Nazwisko jest za krótkie")
    .max(20, "Nazwisko jest za długie")
    .required(),
  email: yup.string().email().required("Adres e-maill nie jest poprawny"),
  phone: yup
    .string()
    .length(9, "Polski numer telefonu ma 9 cyfr")
    .matches(/^[0-9]+$/, "Numer składa się tylko z cyfr")
    .required(),
  cardNumber: yup
    .string()
    .length(16, "Podaj 16 cyfr")
    .required("Numer konta jest obowiązkowy"),
  cardExpirationDate: yup
    .string()
    .test("test MMYY", "Sprawdź format miesiąc/rok", validateMMYY)
    .required(),
  cardCvc: yup
    .string()
    .min(3, "Numer wymagany")
    .max(4, "Numer wymagany")
    .matches(/^[0-9]+$/, "Numer składa się tylko z cyfr")
    .required(),
  country: yup.string().required(),
  postalCode: yup
    .string()
    .test("test postalCode", "Sprawdź kod pocztowy", validatePostalCode)
    .matches(/\d{2}-\d{3}/, "Zły kod pocztowy")
    .required(),
});

type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormSchema),
  });
  const onSubmit = (data: CheckoutFormData) => console.log(data);

  return (
    <FormProvider {...methods}>
      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2">
          <div className="py-12 bg-gray-50 md:py-24">
            <div className="max-w-lg px-4 mx-auto space-y-8 lg:px-8">
              <div className="flex items-center">
                <span className="w-10 h-10 bg-blue-700 rounded-full"></span>

                <h2 className="ml-4 font-medium text-gray-900">BambooYou</h2>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  $99.99
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  For the purchase of
                </p>
              </div>

              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                    <li className="flex items-center py-4">
                      <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="object-cover w-16 h-16 rounded"
                      />

                      <div className="ml-4">
                        <h3 className="text-sm text-gray-900">
                          Basic Tee 6-Pack
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>
                    </li>

                    <li className="flex items-center py-4">
                      <img
                        src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                        alt=""
                        className="object-cover w-16 h-16 rounded"
                      />

                      <div className="ml-4">
                        <h3 className="text-sm text-gray-900">
                          Basic Tee 6-Pack
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="py-12 bg-white md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="grid grid-cols-6 gap-4"
              >
                <div className="col-span-3">
                  <Input name="firstName" label="First Name" />
                </div>

                <div className="col-span-3">
                  <Input name="lastName" label="Last Name" />
                </div>

                <div className="col-span-6">
                  <Input name="email" label="Email" />
                </div>

                <div className="col-span-6">
                  <Input name="phone" label="Phone" />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Card Details
                  </legend>

                  <div className="mt-1 -space-y-px bg-white rounded-md shadow-sm">
                    <div>
                      <Input
                        name="cardNumber"
                        label="Card Number"
                        rb="rounded-t-md"
                        sr
                      />
                    </div>

                    <div className="flex -space-x-px">
                      <div className="flex-1">
                        <Input
                          name="cardExpirationDate"
                          label="Card Expiry"
                          rb="rounded-bl-md"
                          sr
                        />
                      </div>

                      <div className="flex-1">
                        <Input
                          name="cardCvc"
                          label="Card CVC"
                          rb="rounded-br-md"
                          sr
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-3 -space-y-px bg-white rounded-md shadow-sm">
                    <div>
                      <Select
                        name="country"
                        label="Country"
                        options={[
                          "England",
                          "Wales",
                          "Scotland",
                          "France",
                          "Belgium",
                          "Japan",
                        ]}
                      />
                    </div>

                    <div>
                      <Input
                        name="postalCode"
                        label="ZIP/Post Code"
                        rb="rounded-b-md"
                        sr
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg">
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};
