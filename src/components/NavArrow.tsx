import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavArrowProps {
  direction: "prev" | "next";
  label: string;
}

/**
 * Botão de seta do carrossel. Ainda sem onClick — só a aparência e a
 * acessibilidade básica (aria-label) prontas pra você ligar a lógica.
 */
export default function NavArrow({ direction, label }: NavArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={label}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-edge bg-surface text-ink-muted transition-colors hover:border-electric-teal hover:text-electric-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-teal sm:h-14 sm:w-14"
    >
      <Icon size={22} />
    </button>
  );
}
