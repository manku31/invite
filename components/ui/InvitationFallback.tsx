import { Lotus } from "./Ornaments";
import Link from "next/link";

export default function InvitationFallback({
  title,
  message,
  retry,
}: {
  title: string;
  message: string;
  retry?: () => void;
}) {
  return (
    <main className="fallback-page">
      <div className="fallback-card">
        <Lotus />
        <p className="eyebrow">A celebration of love</p>
        <h1>{title}</h1>
        <p>{message}</p>
        {retry && (
          <button className="button" onClick={retry}>
            Try again
          </button>
        )}
        <Link className={retry ? "text-link" : "button"} href="/">
          Return to the invitation
        </Link>
      </div>
    </main>
  );
}
