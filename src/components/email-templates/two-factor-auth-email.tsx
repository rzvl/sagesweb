import {
  Body,
  CodeInline,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components'

export default function TwoFactorAuthEmail({ code }: { code: string }) {
  return (
    <Html>
      <Head />
      <Preview>SagesWeb Email Verification</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#0A0A0A] px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[384px] p-[20px]">
            <Text className="text-[14px] leading-[24px] text-[#A1A1A1]">
              For added security, please use the following 2FA code to complete
              your login:
            </Text>
            <Text className="text-[20px] font-semibold leading-[24px] text-[#A1A1A1]">
              Your 2FA Code: <CodeInline>{code}</CodeInline>
            </Text>
            <Text className="text-[14px] leading-[24px] text-[#A1A1A1]">
              This code is valid for the next{' '}
              <span className="font-bold">5 minutes</span>. If you did not
              request this, please ignore this email or contact support
              immediately.
            </Text>
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
