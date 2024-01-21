export interface StripeEndpoint {
  id: string
  object: string
  api_version: string
  created: number
  data: Data
  livemode: boolean
  pending_webhooks: number
  request: Request
  type: string
}

interface Data {
  object: Object
}

interface Object {
  id: string
  object: string
  amount: number
  amount_capturable: number
  amount_details: any[]
  amount_received: number
  application: any
  application_fee_amount: any
  automatic_payment_methods: any
  canceled_at: any
  cancellation_reason: any
  capture_method: string
  charges: any[]
  client_secret: string
  confirmation_method: string
  created: number
  currency: string
  customer: any
  description: string
  invoice: any
  last_payment_error: any
  latest_charge: any
  livemode: boolean
  metadata: MetadataStripe | {}
  next_action: any
  on_behalf_of: any
  payment_method: any
  payment_method_configuration_details: any
  payment_method_options: any[]
  payment_method_types: any[]
  processing: any
  receipt_email: any
  review: any
  setup_future_usage: any
  shipping: any
  source: any
  statement_descriptor: any
  statement_descriptor_suffix: any
  status: string
  transfer_data: any
  transfer_group: any
}

export interface MetadataStripe {
  donorbox_campaign: string
  donorbox_name: string
  donorbox_last_name: string
  donorbox_donation_type: string
  donorbox_email: string
  donorbox_first_name: string
  donorbox_recurring_donation: string
  donorbox_first_recurring_charge: string
  donorbox_plan_interval: string
  donorbox_form_id: string
}


interface Request {
  id: string
  idempotency_key: string
}
