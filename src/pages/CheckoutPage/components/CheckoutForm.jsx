import { useForm } from "react-hook-form";
import FormInput from "../../../ui/FormInput";

function CheckoutForm({ user, onSubmit, isCreating }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.user_metadata?.fullName || "",
      shippingEmail: user?.email || "",
      address: user?.user_metadata?.address || "",
      city: user?.user_metadata?.city || "",
      zipCode: user?.user_metadata?.zipCode || "",
    },
  });

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* 1. Delivery & Contact */}
      <div className="bg-surface rounded-3xl border border-white/10 p-8 shadow-xl">
        <h2 className="text-primary mb-6 text-sm font-black tracking-[0.2em] uppercase">
          1. Personal Details
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
            validation={{ required: "Required" }}
            disabled={isCreating}
          />
          <FormInput
            label="Delivery Email"
            name="shippingEmail"
            register={register}
            error={errors.shippingEmail}
            validation={{
              required: "Required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            }}
            disabled={isCreating}
          />
        </div>
      </div>

      {/* 2. Billing / Shipping Address */}
      <div className="bg-surface rounded-3xl border border-white/10 p-8 shadow-xl">
        <h2 className="text-primary mb-6 text-sm font-black tracking-[0.2em] uppercase">
          2. Billing Address
        </h2>
        <div className="grid gap-4">
          <FormInput
            label="Street Address"
            name="address"
            register={register}
            error={errors.address}
            validation={{ required: "Required" }}
            disabled={isCreating}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="City"
              name="city"
              register={register}
              error={errors.city}
              validation={{ required: "Required" }}
              disabled={isCreating}
            />
            <FormInput
              label="Zip Code"
              name="zipCode"
              placeholder="00-000"
              register={register}
              error={errors.zipCode}
              validation={{ required: "Required" }}
              disabled={isCreating}
            />
          </div>
        </div>
      </div>

      {/* 3. Payment */}
      <div className="bg-surface rounded-3xl border border-white/10 p-8 shadow-xl">
        <h2 className="text-primary mb-6 text-sm font-black tracking-[0.2em] uppercase">
          3. Payment Method
        </h2>
        <div className="flex flex-col gap-3">
          <div className="border-primary/50 bg-primary/5 flex items-center justify-between rounded-2xl border p-5 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-primary h-3 w-3 rounded-full" />
              <span className="font-bold text-white">
                Simulated Checkout (Vault)
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
              Instant Delivery
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
