import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

export function VerificationEmail({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>SagesWeb Email Verification</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#0A0A0A] px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[384px] p-[20px]">
            <Heading className="mx-0 mb-[32px] mt-[96px] p-0 text-[24px] font-semibold text-[#EDEDED]">
              Confirm your account
            </Heading>
            <Text className="text-[14px] leading-[24px] text-[#A1A1A1]">
              Thank you for signing up for SagesWeb. To confirm your account,
              please follow the button below.
            </Text>
            <Section className="mb-[32px] mt-[32px]">
              <Button
                className="rounded bg-[#F2F2F2] px-9 py-3 text-center text-[14px] font-semibold text-[#171717] no-underline"
                href={url}
              >
                Confirm your account
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#2E2E2E]" />
            <Text className="text-[12px] leading-[24px] text-[#A1A1A1]">
              2034 Dubai Building,
              <br />
              Dubai, United Arab Emirates
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
