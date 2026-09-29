import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Sign in — IP-SAKTI Sahayak" },
    { name: "description", content: "Sign in to IP-SAKTI Sahayak or continue as a demo user." },
    { property: "og:title", content: "Sign in — IP-SAKTI Sahayak" },
    { property: "og:description", content: "Access the IP-SAKTI Sahayak workspace." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) { setError("Please enter your email and password."); return; }
    setError("");
    navigate({ to: "/dashboard" });
  };

  return <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
    <div className="w-full max-w-sm fade-in">
      <Link to="/" className="mx-auto flex w-fit items-center gap-3" aria-label="IP-SAKTI home">
        <span className="brand-mark"><Leaf className="size-5" /></span>
        <span className="leading-none"><strong className="block text-[15px] tracking-[0.15em]">IP-SAKTI</strong><span className="mt-1 block text-[10px] tracking-[0.24em] text-muted-foreground">SAHAYAK</span></span>
      </Link>
      <div className="panel mt-8 p-6 sm:p-8">
        <h1 className="text-center text-3xl font-medium">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to continue to IP-SAKTI Sahayak</p>
        <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
          <label className="block"><span className="micro-label">EMAIL</span>
            <input type="email" autoComplete="email" className="field mt-1.5" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label className="block"><span className="micro-label">PASSWORD</span>
            <span className="relative mt-1.5 block">
              <input type={show ? "text" : "password"} autoComplete="current-password" className="field pr-10" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
            </span>
          </label>
          <div className="flex justify-end"><a href="#" onClick={e => e.preventDefault()} className="text-xs text-primary hover:underline">Forgot password?</a></div>
          {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
          <Button type="submit" variant="hero" className="w-full">Sign In <ArrowRight /></Button>
        </form>
        <div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="micro-label">OR</span><span className="h-px flex-1 bg-border" /></div>
        <Button variant="glass" className="w-full" onClick={() => navigate({ to: "/dashboard" })}>Continue as Demo User</Button>
        <p className="mt-6 text-center text-xs text-muted-foreground">Don't have an account? <a href="#" onClick={e => e.preventDefault()} className="text-primary hover:underline">Create account</a></p>
      </div>
      <p className="mt-6 text-center text-[11px] text-muted-foreground">Prototype sign-in · no real authentication</p>
    </div>
  </div>;
}
