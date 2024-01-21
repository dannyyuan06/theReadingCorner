import { MetadataStripe, StripeEndpoint } from "@/lib/types/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {

  let event:StripeEndpoint

  try {
    const sig = req.headers.get('stripe-signature') ?? "";
    event = Stripe.webhooks.constructEvent(await req.text(), sig, process.env.STRIPE_ENDPOINT_SECRET ?? "") as StripeEndpoint
    
  } catch(err) {
    console.error(err);
    return NextResponse.json({error: JSON.stringify(err), status: 400})
  }

  const metadataOrNull = event.data.object.metadata;
  if (Object.keys(metadataOrNull).length === 0) return NextResponse.json({error: "Metadata was not present", status: 200})

  const metadata = metadataOrNull as MetadataStripe

  return NextResponse.json({something: "something"})
}

export const config = {
  api: {
    bodyParser: false,
  },
}