import { Html, Body, Heading, Text, Section, Hr } from '@react-email/components'

export interface InquiryEmailProps {
  contactName: string
  companyName: string
  role?: string
  email: string
  phone?: string
  productInterest?: string
  destinationCountry?: string
  incoterm?: string
  quantity?: string
  timeline?: string
  message?: string
  submittedAt: string
}

export function InquiryEmail({
  contactName,
  companyName,
  role,
  email,
  phone,
  productInterest,
  destinationCountry,
  incoterm,
  quantity,
  timeline,
  message,
  submittedAt,
}: InquiryEmailProps) {
  return (
    <Html>
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Heading>New Inquiry from {companyName}</Heading>

        <Section>
          <Text>
            <strong>Contact Name:</strong> {contactName}
          </Text>
          {role ? (
            <Text>
              <strong>Role:</strong> {role}
            </Text>
          ) : null}
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          {phone ? (
            <Text>
              <strong>Phone:</strong> {phone}
            </Text>
          ) : null}
        </Section>

        <Hr />

        <Section>
          {productInterest ? (
            <Text>
              <strong>Product Interest:</strong> {productInterest}
            </Text>
          ) : null}
          {destinationCountry ? (
            <Text>
              <strong>Destination Country:</strong> {destinationCountry}
            </Text>
          ) : null}
          {incoterm ? (
            <Text>
              <strong>Quotation Type:</strong> {incoterm}
            </Text>
          ) : null}
          {quantity ? (
            <Text>
              <strong>Quantity:</strong> {quantity}
            </Text>
          ) : null}
          {timeline ? (
            <Text>
              <strong>Timeline:</strong> {timeline}
            </Text>
          ) : null}
        </Section>

        <Hr />

        <Section>
          <Text>
            <strong>Message:</strong>
          </Text>
          <Text>{message ?? 'No message provided.'}</Text>
        </Section>

        <Text>Submitted at {submittedAt}</Text>
      </Body>
    </Html>
  )
}
