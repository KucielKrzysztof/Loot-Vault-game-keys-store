import { useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../../../ui/FormInput";
import type { User } from "@supabase/supabase-js";

interface PaymentBadgeProps {
  src: string;
  alt: string;
  isPng?: boolean;
}

function PaymentBadge({ src, alt, isPng = false }: PaymentBadgeProps) {
  return (
    <div className="bg-surface flex h-10 w-16 items-center justify-center rounded-xl border border-white/5 p-2">
      <img
        src={src}
        alt={alt}
        className={`max-h-full max-w-full object-contain ${isPng ? "brightness-125" : ""}`}
      />
    </div>
  );
}

export interface CheckoutFormValues {
  fullName: string;
  shippingEmail: string;
  address: string;
  city: string;
  zipCode: string;
}

interface CheckoutFormProps {
  user: User | null;
  onSubmit: SubmitHandler<CheckoutFormValues>;
  isProcessing: boolean;
}

function CheckoutForm({ user, onSubmit, isProcessing }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
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
            disabled={isProcessing}
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
            disabled={isProcessing}
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
            disabled={isProcessing}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="City"
              name="city"
              register={register}
              error={errors.city}
              validation={{ required: "Required" }}
              disabled={isProcessing}
            />
            <FormInput
              label="Zip Code"
              name="zipCode"
              placeholder="00-000"
              register={register}
              error={errors.zipCode}
              validation={{ required: "Required" }}
              disabled={isProcessing}
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
                Secure Checkout via Stripe
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <PaymentBadge
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Blik_logo.jpg/250px-Blik_logo.jpg"
                alt="BLIK"
              />
              <PaymentBadge
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Przelewy24_logo.png/250px-Przelewy24_logo.png"
                alt="P24"
                isPng
              />
              <PaymentBadge
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
              />
              <PaymentBadge
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
