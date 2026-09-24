import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductPlaceholder({ title, description }: { title: string; description: string }) {
  return <main className="grid min-h-screen place-items-center bg-background px-6"><div className="max-w-xl text-center"><span className="brand-mark mx-auto"><Leaf className="size-5"/></span><Construction className="mx-auto mt-10 size-8 text-gold"/><p className="eyebrow mt-6">IP-SAKTI PLATFORM</p><h1 className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1><p className="mt-6 leading-7 text-muted-foreground">{description}</p><Button asChild variant="glass" size="lg" className="mt-9"><Link to="/"><ArrowLeft/> Back to home</Link></Button></div></main>;
}