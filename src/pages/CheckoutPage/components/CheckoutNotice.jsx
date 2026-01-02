function CheckoutNotice() {
  return (
    <div className="rounded-2xl bg-white/5 p-6">
      <ul className="list-disc text-left">
        <li className="text-[11px] leading-relaxed font-medium tracking-widest text-white/30 uppercase">
          Digital product keys are delivered via email. Check your "Key Delivery
          Email" after purchase.
        </li>
        <li className="text-[11px] leading-relaxed font-medium tracking-widest text-white/30 uppercase">
          By confirming, you agree to our digital delivery terms. Keys are
          generated instantly after payment.
        </li>
      </ul>
    </div>
  );
}

export default CheckoutNotice;
