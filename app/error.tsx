"use client";
import InvitationFallback from "@/components/ui/InvitationFallback";

export default function InvitationError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <InvitationFallback
      title="A little pause"
      message="We couldn’t open this part of the invitation. Please try again."
      retry={retry}
    />
  );
}
