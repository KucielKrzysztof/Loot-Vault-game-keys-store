import Accordion from "../../../ui/Accordion";

function FAQ() {
  return (
    <div className="mx-auto max-w-3xl py-20">
      <h2 className="mb-10 text-center text-3xl font-black tracking-tighter text-white">
        Frequently Asked Questions
      </h2>

      <Accordion allowMultiple={false}>
        <Accordion.Item>
          <Accordion.Header>How do I receive my game key?</Accordion.Header>
          <Accordion.Content>
            Your key will be delivered instantly to your email address and your
            account dashboard immediately after the payment is confirmed.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            Are these keys global or region-locked?
          </Accordion.Header>
          <Accordion.Content>
            Each product page clearly states the region. Most of our keys are
            Global, but please check the "Region" badge before purchasing.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>What if my key doesn't work?</Accordion.Header>
          <Accordion.Content>
            Our 24/7 support team is here to help. If there's any issue with
            your code, we provide an instant replacement or a full refund.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FAQ;
